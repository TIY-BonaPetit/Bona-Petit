from django.contrib import admin

from .models import Collector, UserProfile


class CollectorAdmin(admin.ModelAdmin):
	readonly_fields = ('time_collected',)


admin.site.register(Collector, CollectorAdmin)
admin.site.register(UserProfile)
