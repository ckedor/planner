from django.contrib import admin
from django.conf.urls import include
from django.urls import path
from rest_framework import routers
from rest_framework.authtoken import views

from financas.viewsets import CategoriaGastoViewSet, GastoViewSet, SubCategoriaGastoViewSet
from project.viewsets import UserViewSet


router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'financas/categorias_gasto', CategoriaGastoViewSet)
router.register(r'financas/sub_categorias_gasto', SubCategoriaGastoViewSet)
router.register(r'financas/gastos', GastoViewSet, basename='Gasto')

urlpatterns = [
    path('', include(router.urls)), 
    path('admin/', admin.site.urls),
    path('auth/', views.obtain_auth_token, name='auth'),
]