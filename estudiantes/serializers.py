from rest_framework import serializers
from .models import Estudiante

#Serializer para convertir el modelo Estudiante a JSON y viceversa
class EstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estudiante  # Especifica el modelo a serializar
        fields = '__all__'  # Incluye todos los campos (id, nombre_completo, email, curso)