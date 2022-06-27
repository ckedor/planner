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
        
class GastoGetSerializer(serializers.ModelSerializer):
    
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
        fields = ['id', 'descricao', 'data', 'valor', 'sub_categoria']

class GastoCreateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Gasto
        fields = ['id', 'descricao', 'data', 'valor', 'sub_categoria']
        
    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        gasto = Gasto.objects.create(**validated_data)
        return gasto