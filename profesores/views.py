from django.shortcuts import render

from rest_framework import viewsets
from .models import Profesor
from .serializers import ProfesorSerializer

# ViewSet que provee automáticamente las operaciones CRUD para Profesor
class ProfesorViewSet(viewsets.ModelViewSet):
    queryset = Profesor.objects.all()
    serializer_class = ProfesorSerializer