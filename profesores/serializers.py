from rest_framework import serializers
from .models import Profesor

#Serializer para convertir el modelo Profesor a JSON y viceversa
class ProfesorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profesor  # Especifica el modelo a serializar
        fields = '__all__'  # Incluye todos los campos del modelo (id, nombre, especialidad, email)