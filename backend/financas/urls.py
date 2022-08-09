from django.contrib import admin
from django.urls import path

from .viewsets import get_gastos_receitas

urlpatterns = [
    path('financas/gastos_receitas/', get_gastos_receitas)
]

