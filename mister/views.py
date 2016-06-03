import csv
from django.shortcuts import render
from django.http import HttpResponse
from .models import Collector
from rest_framework import viewsets
from .serializers import CollectorSerializer


def index(request):
    return render(request, 'index.html')


def collection(request):
	data = Collector.objects.all().order_by('-time_collected')
	return render(request, 'plantinfo.html', {'data': data, })



class CollectionsViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows mister collections to be viewed or edited.
    """
    queryset = Collector.objects.all().order_by('-pH_level')
    serializer_class = CollectorSerializer
