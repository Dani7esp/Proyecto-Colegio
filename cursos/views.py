from django.shortcuts import render

from rest_framework import viewsets
from .models import Curso
from .serializers import CursoSerializer

# ViewSet que provee automáticamente las operaciones CRUD para Curso
class CursoViewSet(viewsets.ModelViewSet):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer
