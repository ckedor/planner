from rest_framework import serializers
from .models import CategoriaGasto, SubCategoriaGasto, Gasto
    
    
class SubCategoriaGastoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SubCategoriaGasto
        fields = ['id', 'nome']   
        
class CategoriaGastoSerializer(serializers.HyperlinkedModelSerializer):
    sub_categorias = SubCategoriaGastoSerializer(many=True, source='subcategoriagasto_set')

    class Meta:
        model = CategoriaGasto
        fields = ['id', 'nome', 'sub_categorias']    
        
class GastoGetSerializer(serializers.HyperlinkedModelSerializer):
    
    class SubCategoriaSerializer(serializers.HyperlinkedModelSerializer):
        class CategoriaSerializer(serializers.HyperlinkedModelSerializer):
            class Meta:
                model = CategoriaGasto
                fields = ['id', 'nome']  
        
        categoria = CategoriaSerializer()
        class Meta:
            model = SubCategoriaGasto
            fields = ['id', 'nome', 'categoria']   
    
    sub_categoria = SubCategoriaSerializer()
    class Meta:
        model = Gasto
        fields = ['id', 'data', 'valor', 'sub_categoria']

class GastoCreateSerializer(serializers.HyperlinkedModelSerializer):
    
    class Meta:
        model = Gasto
        fields = ['id', 'user', 'descricao', 'data', 'valor', 'sub_categoria']
