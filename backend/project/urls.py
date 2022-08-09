from django.contrib import admin
from django.conf.urls import include
from django.urls import path
from rest_framework import routers

from financas.viewsets import CategoriaGastoViewSet, GastoViewSet, ReceitaViewSet, SubCategoriaGastoViewSet
from rest_framework_simplejwt.views import TokenRefreshView
from .viewsets import UserViewSet, CustomTokenObtainPairView


router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'financas/categorias_gasto', CategoriaGastoViewSet)
router.register(r'financas/sub_categorias_gasto', SubCategoriaGastoViewSet)
router.register(r'financas/gastos', GastoViewSet, basename='gasto')
router.register(r'financas/receitas', ReceitaViewSet, basename='receita')

urlpatterns = [
    path('', include(router.urls)),
    path('', include('financas.urls')),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), 
    path('admin/', admin.site.urls),
]