from django.conf.urls import include, url, patterns
from django.contrib import admin
from mister import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'mister', views.CollectionsViewSet)


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^', include('mister.urls')),
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
