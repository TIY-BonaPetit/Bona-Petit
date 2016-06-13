from django.db import models
from django.contrib.auth.models import User
from django.core.mail import EmailMessage


# two separates models: temp and ec_levl?
class Collector(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    ec_level = models.FloatField(default=0)
    temperature = models.FloatField(default=0)
    time_collected = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "EC: {}, Temp: {}".format(
                str(self.ec_level), str(self.temperature))

    class Meta:
        get_latest_by = 'time_collected'

    # def save(self):
    #     super().save()
    #     if self.temp_is_approaching_threshold():
    #         return self.send_alert_email()

    # def temp_is_approaching_threshold(self):
    #     if self.temperature >= 27 or self.temperature <= 23:
    #         return self.send_alert_email_temp()
    #     else:
    #         return False

    # def ec_is_approaching_threshold(self):
    #     if self.ec_level >=1080 or self.ec_level <= 320:
    #         reuturn self.send_alert_email_ec ()
    #     else:
    #         return False

    # def ec_temp_both_approaching_threshold(self):
    #     if self.ec_level >= 1080 or self.ec_level <=320 and self.temperature >=27 or self.temperature <=23:
    #         return self.send_alert_email_ec_temp ()
    #     else:
    #         return False

    # def


    # # function for calling the email in the Collector models. look at pic on phone from bryce. Collector.save() and .super() stuff
    # def temp_is_approaching_threshold(self):
    # if temperature >= 27 or temperature =< 23:
        # call email function (temperature alert)
    # def EC_is_approaching_threshold(self):
    # if EC >= 1080 or EC =< 320:
        # call email function (EC alert)
    # def both_approaching_threshold(self):
    # if temperature >= 27 or temperature <= 23 AND ec_level >= 1080 or ec_level <= 320:
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
