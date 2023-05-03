from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required


# @login_required
def home_view(request):
    print(request.user, request.user.is_authenticated)
    error_message = ""

    return render(request, 'home.html', {'error_message': error_message})