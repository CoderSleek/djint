from django.shortcuts import render, redirect, HttpResponseRedirect
from .models import User
import jwt
import datetime
from myproject.settings import ENVIRON
from django.http import JsonResponse


def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        if not all([username, password]):
            return render(request, 'login.html', {'error_message': "Username or password cannot be blank"})

        user = User.objects.check_user_password(username, password)
        if user is None:
            error_message = "User does not exist."
        elif user is False:
            error_message = "Invalid password."
        else:
            expiry_time = datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
            payload = {
                'name': user.username,
                'password': user.password,
                'exp': expiry_time,
                'iat': datetime.datetime.utcnow()
            }
            token = jwt.encode(payload, ENVIRON['SECRET_KEY'], algorithm=ENVIRON['SECRET_ALGORITHM'])
            response = HttpResponseRedirect('/home/')
            response.set_cookie('token', token, httponly=True, expires=expiry_time)
            return response

    else:
        error_message = ""

    return render(request, 'login.html', {'error_message': error_message})


def signup_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        conf_password = request.POST.get('conf-password')
        
        if not all([username, password, conf_password]):
            error_message = "user name or password cannot be empty"
        elif password != conf_password:
            error_message = "password and confirm password do not match"
        # elif user == 'already exists':
        #     error_message = "choose a different user name"
        else:
            user = User.objects.create_user(username, password)
    else:
        error_message = ""

    return render(request, 'signup.html', {'error_message': error_message})


def logout_view(request):
    logout(request)
    return redirect('login')


def home_view(request):
    # token = getattr(request, 'jwt_token', None)
    # if token:
    #     return render(request, 'home.html', {'error_message': ""})
    # else:
    #     return redirect('login')

    return render(request, 'index.html')


def r(request):
    return JsonResponse({'random': 'bs'})