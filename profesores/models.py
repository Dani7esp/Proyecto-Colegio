from django.db import models


class Profesor(models.Model):
    # Nombre completo del profesor (máximo 100 caracteres)
    nombre = models.CharField(max_length=100)
    
    # Área o materia de especialidad (máximo 100 caracteres)
    especialidad = models.CharField(max_length=100)
    
    # Correo electrónico único para evitar duplicados
    email = models.EmailField(unique=True)

    # Método para representación en texto del objeto (por ejemplo en Django Admin)
    def __str__(self):
        return f"{self.nombre} - {self.especialidad}"
    