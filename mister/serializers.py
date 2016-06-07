from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email')


class CollectorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Collector
        fields = ('user', 'pH_level', 'temperature', 'time_collected')

