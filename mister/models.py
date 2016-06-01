import datetime

from django.db import models
from django.utils import timezone


class Collector(models.Model):
    pH_level = models.FloatField()
    temperature = models.FloatField()
    time_collected = models.DateTimeField(auto_now_add=True)

   
   