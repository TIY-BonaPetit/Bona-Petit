import datetime

from django.db import models
from django.utils import timezone


class Collector(models.Model):
    pH_level = models.FloatField()
    temperature = models.FloatField()
    time_collected = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.pH_level)

   # two separates models: temp and pH_levl
