import csv
from django.shortcuts import render
from django.http import HttpResponse
from mister.models import Collector


def index(request):
    return render(request, 'index.html')


def collection(request):
	data = Collector.objects.all().order_by('-time_collected')
	return render(request, 'plantinfo.html', {'data': data, })

# def instance_detail(request, id):
# 	instance=Collector.objects.get(id=id)
# 	return render(request, 'instance_detail.html', {'instance': instance,})
# 	pass


def data_csv(request):
	response = HttpResponse(content_type='text/csv')
	response['Content-Disposition'] = 'attachment; filename="data_csv.csv"'
	# Create the HttpResponse object with the appropriate CSV header.

	writer = csv.writer(response)
	writer.writerow(Collector.objects.all())

	return response
