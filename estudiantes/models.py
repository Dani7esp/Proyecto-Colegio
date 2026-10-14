from django.db import models
from cursos.models import Curso  # Importamos el modelo Curso de la app cursos

class Estudiante(models.Model):
    # Nombre completo del estudiante (máximo 100 caracteres)
    nombre_completo = models.CharField(max_length=100)
    
    # Correo electrónico del estudiante (único para evitar duplicados)
    email = models.EmailField(unique=True)
    
    # Relación ForeignKey hacia Curso (si el curso se elimina, se borra el registro en cascada)
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE, related_name='estudiantes')

    # Representación en texto del objeto
    def __str__(self):
        return f"{self.nombre_completo} ({self.email})"