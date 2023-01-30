import datetime
from rest_framework import viewsets, serializers
from rest_framework.decorators import action
from contas_casa.models import ContaExtra, ContasCasa, Morador

class ContasCasaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContasCasa
        fields = ['id', 'mes', 'piscina', 'faxineira', 'internet', 'guarda', 
                  'luz', 'agua', 'extra_iptu', 'caixinha']

class MoradorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Morador
        fields = '__all__'

class ContasExtraGetSerializer(serializers.ModelSerializer):
    dono = MoradorSerializer()
    class Meta:
        model = ContaExtra
        fields = ['id', 'data', 'dono', 'valor', 'descricao']

class ContasExtraPutSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ContaExtra
        fields = ['id', 'data', 'dono', 'valor', 'descricao']

class ContasCasaViewset(viewsets.ModelViewSet):
    queryset = ContasCasa.objects.all()
    
    def get_queryset(self):
        queryset = super().get_queryset()
        month = self.request.query_params.get('month', None)
        if month:
            month = datetime.datetime.strptime(month, "%m/%Y")
            queryset = queryset.filter(mes__year = month.year, 
                                       mes__month = month.month)
            if not queryset:
                contas_casa = ContasCasa(
                   mes = month, 
                   piscina = 130,
                   faxineira = 390,
                   internet =  143.15,
                   guarda = 120,
                   luz = 0,
                   agua = 0,
                   extra_iptu = 131.58,
                   gas = 0,
                   caixinha = 80,
                )
                contas_casa.save()
            queryset = ContasCasa.objects.all().filter(mes__year = month.year, 
                                                       mes__month = month.month)
            
        return queryset
    
    def get_serializer_class(self):
        return ContasCasaSerializer
    
class ContaExtraViewset(viewsets.ModelViewSet):
    queryset = ContaExtra.objects.all()
    
    def get_queryset(self):
        queryset = super().get_queryset()
        month = self.request.query_params.get('month', None)
        if month:
            month = datetime.datetime.strptime(month, "%m/%Y")
            queryset = queryset.filter(data__year = month.year, 
                                       data__month = month.month)
        return queryset
    
    def get_serializer_class(self):
        if self.action == 'create' or self.action == 'update':
            return ContasExtraPutSerializer
        return ContasExtraGetSerializer
    
class MoradoresViewset(viewsets.ModelViewSet):
    queryset = Morador.objects.all()
    
    def get_serializer_class(self):
        return MoradorSerializer