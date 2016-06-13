import csv

from rest_framework import viewsets

from django.shortcuts import render, render_to_response  # , get_or_create
from django.http import HttpResponse, HttpResponseRedirect
from django.template import RequestContext

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from django.contrib.auth.decorators import login_required

from .serializers import CollectorSerializer, UserSerializer
from .forms import UserForm, UserProfileForm
from .models import Collector, UserProfile

from django.core.mail import EmailMessage


# email = EmailMessage('title', 'body', to=[email])
# email.send()

def index(request):
    return render(request, 'index.html')


def collection(request):
    try:
        # filtered = Collector.objects.filter(user=request.user)
        latest = Collector.objects.filter(user=request.user).latest()
        context = {'latest': latest}
    except:
        latest = Collector.objects.create()
        context = {'latest': latest}
    return render(request, 'plantinfo.html', context)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class CollectionsViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows mister collections to be viewed or edited.
    """
    queryset = Collector.objects.all().order_by('-time_collected')
    serializer_class = CollectorSerializer


def register(request):
    context = RequestContext(request)
    registered = False
    if request.method == 'POST':
        user_form = UserForm(data=request.POST)
        profile_form = UserProfileForm(data=request.POST)
        if user_form.is_valid() and profile_form.is_valid():
            user = user_form.save()
            user.set_password(user.password)
            user.save()
            profile = profile_form.save(commit=False)
            profile.user = user

            profile.save()

            registered = True
        else:
            print(user_form.errors, profile_form.errors)
    else:
        user_form = UserForm()
        profile_form = UserProfileForm()

    return render_to_response(
            'register.html',
            {'user_form': user_form,
             'profile_form': profile_form,
             'registered': registered},
            context)


@login_required
def restricted(request):
    return HttpResponse("You're Logged In!")


def user_login(request):
    context = RequestContext(request)

    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(username=username, password=password)

        if user:
            if user.is_active:
                login(request, user)
                return HttpResponseRedirect('plantinfo')
            else:
                return HttpResponse("Your Bona Petite account is disabled.")
        else:
            print('Invalid login details: {}, {}'.format(username, password))
            return HttpResponse("Invalid login details supplied.")

    else:
        return render_to_response('login.html', {}, context)


@login_required
def user_logout(request):
    logout(request)
    return HttpResponseRedirect('index')


@login_required
def profile(request):
    pass


def data_csv(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="data_csv.csv"'
    writer = csv.writer(response)
    filtered = Collector.objects.filter(user=request.user)
    data = filtered.order_by('-time_collected')
    for collector in data:
        writer.writerow([collector.ec_level, collector.temperature])
    return response
