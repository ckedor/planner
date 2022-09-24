import datetime
import numpy as np
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.decorators import api_view
from rest_framework.response import Response
from financas.models import CategoriaGasto, Gasto, Receita, SubCategoriaGasto
from financas.serializers import CategoriaGastoSerializer, GastoCreateSerializer, GastoGetSerializer, ReceitaCreateSerializer, ReceitaGetSerializer, SubCategoriaGastoSerializer
from django.db.models import F, Sum
from django.db.models.functions import TruncMonth
import pandas as pd

class CategoriaGastoViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = CategoriaGastoSerializer
    queryset = CategoriaGasto.objects.all()
    
class SubCategoriaGastoViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = SubCategoriaGastoSerializer
    queryset = SubCategoriaGasto.objects.all()
    
class GastoViewSet(viewsets.ModelViewSet):
    queryset = Gasto.objects.all()
    
    def get_queryset(self):
        user_id = self.request.user.id
        month = self.request.query_params.get('month', None)
        
        queryset = Gasto.objects.filter(user_id=user_id)
        if month:
            month = datetime.datetime.strptime(month, "%m/%Y")
            queryset = queryset.filter(data__year = month.year, 
                                       data__month = month.month)
        
        return queryset
    
    def get_serializer_class(self):
        if self.action == 'create' or self.action == 'update':
            return GastoCreateSerializer
        return GastoGetSerializer
    
    @action(methods=['GET'], detail=False)
    def por_categoria(self, request, pk=None):
        user_id = request.user.id
        gastos = Gasto.objects.filter(user_id=user_id).order_by('-data')
        month = request.query_params.get('month', None)

        if month:
            month = datetime.datetime.strptime(month, "%m/%Y")
            gastos = gastos.filter(data__year = month.year, 
                            data__month = month.month)
        
        gastos_json = GastoGetSerializer(gastos, many=True).data
        
        gastos_por_subcategoria = gastos.values(subcategoria=F('sub_categoria__nome'),
                                                categoria=F('sub_categoria__categoria__nome'))\
                                        .annotate(gastoTotal=Sum('valor'))\
                                        .order_by('categoria', 'subcategoria')
        
        gastos_por_categoria = gastos.values(categoria=F('sub_categoria__categoria__nome'))\
                                            .annotate(gastoTotal=Sum('valor'))\
                                            .order_by('categoria')
        
        response = {"gastos":gastos_json, 
                    "gastos_por_subcategoria":gastos_por_subcategoria,
                    "gastos_por_categoria":gastos_por_categoria}
        
        return Response(response)
    
class ReceitaViewSet(viewsets.ModelViewSet):
    queryset = Receita.objects.all()
    
    def get_queryset(self):
        user_id = self.request.user.id
        month = self.request.query_params.get('month', None)
        
        queryset = Receita.objects.filter(user_id=user_id)
        if month:
            month = datetime.datetime.strptime(month, "%m/%Y")
            queryset = queryset.filter(data__year = month.year, 
                                       data__month = month.month)
        
        return queryset
    
    def get_serializer_class(self):
        if self.action == 'create' or self.action == 'update':
            return ReceitaCreateSerializer
        return ReceitaGetSerializer

@api_view()
def get_gastos_receitas(request):
    DEFAULT_MONTH_RANGE = 12
    user_id = request.user.id
    
    current_month = request.query_params.get('current_month', None)
    month_range = int(request.query_params.get('range', DEFAULT_MONTH_RANGE))
    current_month = datetime.datetime.strptime(current_month, "%m/%Y")
    first_month = current_month - pd.DateOffset(months=month_range)
    
    receitas = Receita.objects.filter(user_id=user_id,
                                      data__range=[first_month - pd.DateOffset(months=1), 
                                                   current_month + pd.DateOffset(months=1)])\
                            .annotate(month=TruncMonth('data'))\
                            .values('month')\
                            .annotate(receitas=Sum('valor'))\
                            .values('month', 'receitas')\
                            .order_by('month')
    gastos = Gasto.objects.filter(user_id=user_id,
                                  data__range=[first_month - pd.DateOffset(months=1), 
                                               current_month + pd.DateOffset(months=1)])\
                        .annotate(month=TruncMonth('data'))\
                        .values('month')\
                        .annotate(gastos=Sum('valor'))\
                        .values('month', 'gastos')\
                        .order_by('month')
    
    
    month_list = list(pd.date_range(start=first_month, end=current_month, freq='MS').strftime("%Y-%m-%d"))
    
    receitas_list = []
    gastos_list = []
    lucros_list = []
    
    aux_month_list = month_list.copy()
    for month in month_list:
        achou1 = False
        for receita in receitas:
            if month == receita["month"].strftime("%Y-%m-%d"):
                achou1 = True
                receitas_list.append(receita["receitas"])
            
        achou2 = False
        for gasto in gastos:
            if month == gasto["month"].strftime("%Y-%m-%d"):
                achou2 = True
                if achou1:
                    gastos_list.append(gasto["gastos"])
        
        if not achou1 or not achou2:
            aux_month_list.remove(month)
    month_list = aux_month_list 
    lucros_list = list(np.subtract(np.array(receitas_list), np.array(gastos_list)))
    
    return Response({"receitas": receitas_list, 
                     "gastos": gastos_list,
                     "lucros": lucros_list,
                     "months": month_list })
        
        
        
    
    