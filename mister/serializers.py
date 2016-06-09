from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Collector


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email')


class CollectorSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
            read_only=True, default=serializers.CurrentUserDefault())

    class Meta:
        model = Collector
        fields = ('user', 'pH_level', 'temperature', 'time_collected')
        read_only_fields = ('user', )
