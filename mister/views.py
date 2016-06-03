import djqscsv
from django.shortcuts import render
# from django.http import HttpResponse
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


def data_csv(request):
	qs = Collector.objects.all()
	return djqscsv.render_to_csv_response(qs)

# response = HttpResponse(content_type='text/csv')
# response['Content-Disposition'] = 'attachment; filename="data_csv.csv"'
# # Create the HttpResponse object with the appropriate CSV header.
# writer = csv.writer(response)
# writer.writerow(Collector.objects.all())
# return response
