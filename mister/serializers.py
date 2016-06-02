from rest_framework import serializers
from .models import Collector


class CollectorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Collector
        fields = ('url', 'pH_level', 'temperature', 'time_collected',)

