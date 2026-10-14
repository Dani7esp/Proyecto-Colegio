from rest_framework import serializers
from .models import Curso

#Serializer para convertir el modelo Curso a JSON y viceversa
class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso  # Especifica el modelo a serializar
        fields = '__all__'  # Incluye todos los campos (id, nombre, codigo, profesor)