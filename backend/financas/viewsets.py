import datetime
from rest_framework import viewsets
from financas.models import CategoriaGasto, Gasto, SubCategoriaGasto
from financas.serializers import CategoriaGastoSerializer, GastoCreateSerializer, GastoGetSerializer, SubCategoriaGastoSerializer
from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import F, Sum

class CategoriaGastoViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAdminUser,)
    serializer_class = CategoriaGastoSerializer
    queryset = CategoriaGasto.objects.all()
    
class SubCategoriaGastoViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAdminUser,)
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
        gastos = Gasto.objects.filter(user_id=user_id)
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
        
        
        
    
    