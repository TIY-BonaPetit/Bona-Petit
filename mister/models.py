import datetime
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Collector(models.Model):
    user=models.OneToOneField(User)
    pH_level = models.FloatField()
    temperature = models.FloatField()
    time_collected = models.DateTimeField(auto_now_add=True)

   # two separates models: temp and pH_levl?


class UserProfile(models.Model):
    user = models.OneToOneField(User)
    farm_choices = [(1, 'Commercial'), (2, 'Family'), (3, 'Recreational'), (4, 'Other')]
    farm_Type = models.IntegerField(choices=farm_choices)
    crop_choices= [(1, 'Flowers'), (2, 'Herbs'), (3, 'Cannabis'), (4, 'Vegetables'), (5, 'Combination')]
    crop_Type = models.IntegerField(choices=crop_choices)

    def __unicode__(self):
        return self.user.username

   