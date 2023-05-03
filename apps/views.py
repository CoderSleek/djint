from django.shortcuts import render, redirect, HttpResponseRedirect
from .models import User, Event, Like
import jwt
import datetime
from myproject.settings import ENVIRON
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .forms import EventForm


@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data['username']
        password = data['password']

        if not all([username, password]):
            return JsonResponse(
                {'status': False,
                'errorMsg': 'Username or password cannot be empty'}
            )

        user = User.objects.check_user_password(username, password)

        if user is None:
            response = JsonResponse(
                {'status': False,
                'errorMsg': "User does not exist"}
            )
        elif user is False:
            response = JsonResponse(
                {'status': False,
                'errorMsg': "Invalid password"}
            )
        else:
            expiry_time = datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
            payload = {
                'name': user.username,
                'password': user.password,
                'exp': expiry_time,
                'iat': datetime.datetime.utcnow()
            }
            token = jwt.encode(payload, ENVIRON['SECRET_KEY'], algorithm=ENVIRON['SECRET_ALGORITHM'])
            response = JsonResponse({'status': True})
            response.set_cookie('token', token, domain='localhost', samesite='Lax', expires=expiry_time)
        
        return response


@csrf_exempt
def signup_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data['username']
        password = data['password']
        conf_password = data['confirm_password']
        
        if not all([username, password, conf_password]):
            return JsonResponse(
                {'status': False,
                'errorMsg': "Username or password cannot be empty"}
            )

        if password != conf_password:
            response = JsonResponse(
                {'status': False,
                'errorMsg': "Password and confirm password do not match"}
            )
        elif User.objects.filter(username=username).exists():
            response = JsonResponse(
                {'status': False,
                'errorMsg': "User already exists choose another Username"}
            )
        else:
            user = User.objects.create_user(username, password)
            response = JsonResponse({'status': True})

        return response


def logout_view(request):
    logout(request)
    return redirect('login')


@csrf_exempt
def getalldata(request):
    # token = getattr(request, 'jwt_token', None)
    # if token:
    #     return render(request, 'home.html', {'error_message': ""})
    # else:
    #     return redirect('login')

    return render(request, 'index.html')

@csrf_exempt
def newevent(request):
    token = getattr(request, 'jwt_token', None)

    if not token:
        return JsonResponse({'success': False, 'errorMsg': 'token expired'})

    if request.method == 'POST':
        form = EventForm(request.POST, request.FILES)
        if form.is_valid():
            # process the form data and uploaded file here
            title = form.cleaned_data["title"]
            description = form.cleaned_data["description"]
            cost = form.cleaned_data["cost"]
            timing = form.cleaned_data["timing"]
            image = form.cleaned_data["image"]

            if all([title, description, cost, timing, image]):
                print('here')
                userid = User.objects.get_user_id_by_name(token['name'])
                print(userid, title, description, cost, timing, image)
                Event.objects.create_event(
                    userid=userid,
                    title=title,
                    description=description,
                    cost=cost,
                    timing=timing,
                    image=image
                )

            return JsonResponse({'success': True})
    else:
        form = EventForm()
    
    return JsonResponse({'success': False})