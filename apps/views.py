from django.shortcuts import render, redirect, HttpResponseRedirect
from .models import User, Event, Like
import jwt
import datetime
from myproject.settings import ENVIRON
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .forms import EventForm
import base64


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


@csrf_exempt
def getalldata(request):
    token = getattr(request, 'jwt_token', None)
    response_dict = {'success': False}

    if not token:
        return JsonResponse({'success': False, 'errorMsg': 'token expired'}, status=401)
    
    datas = Event.objects.all()
    final = []
    for data in datas:
        image = data.image
        image_base64 = base64.b64encode(image).decode('utf-8')
        packet = {
            'userid': data.userid_id,
            'eventid': data.id,
            'title': data.title,
            'description': data.description,
            'cost': data.cost,
            'timing': data.timing,
            'image': image_base64
        }
        final.append(packet)

    return JsonResponse({'success': True, 'data': final})


@csrf_exempt
def newevent(request):
    token = getattr(request, 'jwt_token', None)
    response_dict = {'success': False}

    if not token:
        return JsonResponse({'success': False, 'errorMsg': 'token expired'}, status=401)

    if not request.method == 'POST':
        return JsonResponse({'success': False, 'errorMsg': 'Invalid request type'})

    form = EventForm(request.POST, request.FILES)

    if not form.is_valid():
        print(form)
        response_dict['errorMsg'] = "Invalid data, add all data and check if it's valid"
        return JsonResponse(response_dict)

    # process the form data and uploaded file here
    title = form.cleaned_data["title"]
    description = form.cleaned_data["description"]
    cost = form.cleaned_data["cost"]
    timing = form.cleaned_data["timing"]
    image = form.cleaned_data["image"]

    user = User.objects.get(username=token['name'])
    if not Event.objects.create_event(
        user,
        title,
        description,
        cost,
        timing,
        image
        ):
        return JsonResponse({'success': False}, status=500)

    return JsonResponse({'success': True})