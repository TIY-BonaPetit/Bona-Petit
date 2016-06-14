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

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        # if self.is_approaching_temp_and_ec_threshold():
        #     self.send_alert_email_temp_and_ec()
        elif self.is_approaching_high_temp_threshold():
            self.send_alert_email_high_temp()
        elif self.is_approaching_low_temp_threshold():
            self.send_alert_email_low_temp()
        elif self.is_approaching_high_ec_threshold():
            self.send_alert_email_high_ec()
        elif self.is_approaching_low_ec_threshold():
            self.send_alert_email_low_ec()

    def is_approaching_high_temp_threshold(self):
        return self.temperature >= 27

    def is_approaching_low_temp_threshold(self):
        return self.temperature <= 23

    def is_approaching_high_ec_threshold(self):
        return self.ec_level >= 1080

    def is_approaching_low_ec_threshold(self):
        return self.ec_level <= 320

    # def is_approaching_temp_and_ec_threshold(self):
        # return (self.is_approaching_high_ec_threshold() or self.is_approaching_low_ec_threshold()) and (self.is_approaching_high_temp_threshold() or self.is_approaching_low_temp_threshold())

    def send_alert_email_high_temp(self):
        email = EmailMessage('Bona Petite Alert: High Temperature!', 'Hi, you need to check your plants as the monitoring system has detected that the temperature is approaching the height of the ideal temperature range', to=['farmerphil2016@gmail.com']) #put in user id future
        email.send()

    def send_alert_email_low_temp(self):
        email = EmailMessage('Bona Petite Alert: Low Temperature!', 'Hi, you need to check your plants as the monitoring system has detected that the temperature is approaching the low of the ideal temperature range', to=['farmerphil2016@gmail.com']) #put in user id future
        email.send()

    def send_alert_email_high_ec(self):
        email = EmailMessage('Bona Petite Alert: High EC!', 'Hi, you need to check your plants as the monitoring system has detected that the EC level is approaching the high of the ideal EC range', to=['farmerphil2016@gmail.com']) #put in user id future
        email.send()

    def send_alert_email_low_ec(self):
        email = EmailMessage('Bona Petite Alert: Low EC!', 'Hi, you need to check your plants as the monitoring system has detected that the EC level is approaching the high of the ideal EC range', to=['farmerphil2016@gmail.com']) #put in user id future
        email.send()

    # def send_alert_email_temp_and_ec(self):
    #     email = EmailMessage('Bona Petite Alert: Temperature and EC!', 'There is a really good chance that your plants are dead because both the EC value and temperature are outside the ideal conditions range', to=['farmerphil2016@gmail.com']) #put in user id future
    #     email.send()

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
