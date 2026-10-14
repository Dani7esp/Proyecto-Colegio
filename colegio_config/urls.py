"""
URL configuration for colegio_config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

# Importamos los ViewSets desde cada una de sus respectivas aplicaciones
from profesores.views import ProfesorViewSet
from cursos.views import CursoViewSet
from estudiantes.views import EstudianteViewSet

# Inicializamos el enrutador por defecto
router = DefaultRouter()

# Registramos las rutas con sus correspondientes ViewSets
router.register(r'profesores', ProfesorViewSet, basename='profesor')
router.register(r'cursos', CursoViewSet, basename='curso')
router.register(r'estudiantes', EstudianteViewSet, basename='estudiante')

# Definimos los patrones de URL del proyecto
urlpatterns = [
    path('admin/', admin.site.urls),
    # Incluimos los endpoints generados por el router bajo el prefijo 'api/'
    path('api/', include(router.urls)),
]