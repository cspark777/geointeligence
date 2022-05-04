from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.models import User, auth
from django.conf import settings

from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from .tokens import account_activation_token
from django.core.mail import EmailMessage, send_mail

# Create your views here.

def login(request):
    if request.method == "POST":
        password = request.POST['password']
        username = request.POST['username']
        user = auth.authenticate(username=username, password = password)
        if user is not None:
            auth.login(request, user)
            return redirect('/dashboard')
        else:
            messages.info(request,'Invalid credentials')
            return redirect('login')

    else:
        return render(request, 'accounts/login.html')

def register(request):

    if request.method == 'POST':
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        email = request.POST['email']
        password = request.POST['password']
        c_password = request.POST['c_password']
        username = request.POST['username']
        if password == c_password:
            if User.objects.filter(username = username).exists():
                messages.info(request,'Username already taken')
                return redirect('register')
                # for printing on console
                # print('Username taken')
            elif User.objects.filter(email = email).exists():
                messages.info(request,'Email already taken')
                return redirect('register')
                #print('Email taken')
            else:
                user =  User.objects.create_user(username = username, password = c_password, email=email, first_name = first_name, last_name= last_name)
                user.save()

                current_site = get_current_site(request)
                mail_subject = 'Activate your account.'
                message = render_to_string('accounts/acc_active_email.html', {
                    'user': user,
                    'domain': current_site.domain,
                    'uid':urlsafe_base64_encode(force_bytes(user.pk)),
                    'token':account_activation_token.make_token(user),
                })
                to_email = email

                send_mail(mail_subject, message, settings.EMAIL_HOST_USER, [to_email])

                print(settings.EMAIL_HOST_USER, to_email)
                '''
                email = EmailMessage(
                            mail_subject, message, to=[to_email]
                )
                email.send()
                '''
                
                return HttpResponse('Please confirm your email address to complete the registration')


                #messages.info(request,'User created Successfully')
                #return redirect('login')
                
        else:
            messages.info(request,'Confirm Password should be same as password')
            return redirect('register')
            #print("Password is not same")
    else:
        return render(request,'accounts/register.html')


def logout(request):
    auth.logout(request)
    return redirect('/')

def activate(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        print(user)
        auth.login(request, user)
        # return redirect('home')
        return HttpResponse('Thank you for your email confirmation. Now you can login your account.')
    else:
        return HttpResponse('Activation link is invalid!')