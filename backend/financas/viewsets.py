import datetime
from rest_framework import viewsets
from financas.models import CategoriaGasto, Gasto, SubCategoriaGasto
from financas.serializers import CategoriaGastoSerializer, GastoCreateSerializer, GastoGetSerializer, SubCategoriaGastoSerializer
from rest_framework.permissions import IsAdminUser

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
    
    # from rest_framework.decorators import action
    # @action(methods=['GET'], detail=True) # /financas/gastos/
    # def action(self, request, pk=None):
    #     pass
        
    
    