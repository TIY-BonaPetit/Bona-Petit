from django.contrib import admin

from .models import Collector, UserProfile


class CollectorAdmin(admin.ModelAdmin):
    readonly_fields = ('time_collected', )

    def get_queryset(self, request):
        return Collector.ojbects.filter(owner=request.user)


admin.site.register(Collector, CollectorAdmin)
admin.site.register(UserProfile)
