from django.db import models

from profesores.models import Profesor  # Importamos el modelo Profesor de la app profesores

class Curso(models.Model):
    # Nombre del curso (máximo 100 caracteres)
    nombre = models.CharField(max_length=100)
    
    # Código único del curso (máximo 20 caracteres)
    codigo = models.CharField(max_length=20, unique=True)
    
    # Relación ForeignKey hacia Profesor con borrado en cascada (on_delete=models.CASCADE)
    profesor = models.ForeignKey(Profesor, on_delete=models.CASCADE, related_name='cursos')

    # Representación en texto del objeto
    def __str__(self):
        return f"{self.codigo} - {self.nombre}"