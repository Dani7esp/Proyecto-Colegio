from django.shortcuts import render

from rest_framework import viewsets
from .models import Estudiante
from .serializers import EstudianteSerializer

# ViewSet que provee automáticamente las operaciones CRUD para Estudiante
class EstudianteViewSet(viewsets.ModelViewSet):
    queryset = Estudiante.objects.all()
    serializer_class = EstudianteSerializer