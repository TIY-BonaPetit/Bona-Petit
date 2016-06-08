from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic import TemplateView

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^about/$', TemplateView.as_view(template_name='about.html'),
        name="about"),
    url(r'^contact/$', TemplateView.as_view(template_name='contact.html'),
        name='contact'),
    url(r'^plantinfo/$', views.collection, name='plantinfo'),
    url(r'^register/$', views.register, name="register"),
    url(r'^register/index/$', views.index),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^login/$', views.user_login, name='login'),
    url(r'^logout/$', views.user_logout, name='logout'),
    url(r'^login/plantinfo/$', views.collection),
    url(r'^logout/index/$', views.index),
    url(r'^profile/$', views.profile, name='profile'),
    url(r'^csv/$', views.data_csv, name='data_csv'),
]
