from django.db import models
from django.contrib.auth.models import User
from django.core.mail import EmailMessage


# two separates models: temp and pH_levl?
class Collector(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ec_level = models.FloatField()
    temperature = models.FloatField()
    time_collected = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "EC: {}, Temp: {}".format(
                str(self.ec_level), str(self.temperature))

    class Meta:
        get_latest_by = 'time_collected'


    # function for calling the email in the Collector models. look at pic on phone from bryce. Collector.save() and .super() stuff
    # def temp_is_approaching_threshold(self):
    # if temperature >= 27 or temperature =< 23:
        # call email function (temperature alert)
    # def EC_is_approaching_threshold(self):
    # if EC >= 1080 or EC =< 320:
        # call email function (EC alert)
    # def both_approaching_threshold(self):
    # if temperature >= 27 or temperature <= 23 AND pH_level >= 1080 or pH_level <= 320:
        # call email function (dire alert! need to check your system ASAP)

    # if email_sent, need to count minutes, if temp or ec still approaching threshold, resend email every 10 mins.

class UserProfile(models.Model):
    user = models.OneToOneField(User)
    farm_choices = [(1, 'Commercial'), (2, 'Family'),
                    (3, 'Recreational'), (4, 'Other')]
    farm_Type = models.IntegerField(choices=farm_choices)
    crop_choices = [(1, 'Flowers'), (2, 'Herbs'), (3, 'Cannabis'),
                    (4, 'Vegetables'), (5, 'Combination')]
    crop_Type = models.IntegerField(choices=crop_choices)
    zip_Code = models.FloatField(max_length=6)

    def __unicode__(self):
        return self.user.username
