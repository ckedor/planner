import datetime
from rest_framework import viewsets, permissions, authentication
from financas.models import CategoriaGasto, Gasto, SubCategoriaGasto
from financas.serializers import CategoriaGastoSerializer, GastoCreateSerializer, GastoGetSerializer, SubCategoriaGastoSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

class CategoriaGastoViewSet(viewsets.ModelViewSet):
    serializer_class = CategoriaGastoSerializer
    queryset = CategoriaGasto.objects.all()
    
class SubCategoriaGastoViewSet(viewsets.ModelViewSet):
    serializer_class = SubCategoriaGastoSerializer
    queryset = SubCategoriaGasto.objects.all()
    
class GastoViewSet(viewsets.ModelViewSet):
    serializer_class = GastoGetSerializer
    queryset = Gasto.objects.all()
    
    def get_queryset(self):
        user = self.request.user
        return Gasto.objects.filter(user=user)
    
    def get_serializer_class(self):
        if self.action == 'create' or self.action == 'update':
            return GastoCreateSerializer
        return GastoGetSerializer
    
class GastosOnCurrentMonth(APIView):
    
    required_params = ['mes']
    
    def get(self, request, format=None):
        for param in self.required_params:
            if param not in request.query_params:
                return Response(data={"Message":f"Informe o {param}"}, status=400)
            
        month = request.query_params['mes']
        
        try:
            requested_month = datetime.datetime.strptime(month, "%m/%Y")
        except:
            return Response(data={"Message":"Erro ao informar o mês"}, status=400)
        
        gastos = Gasto.objects.filter(data__year = requested_month.year,
                                      data__month = requested_month.month)
        serializer = GastoGetSerializer(gastos, many=True)
        return Response(serializer.data)
    
    