from django import forms
from django.contrib import admin
from .models import Gasto, Receita, SubCategoriaGasto, CategoriaGasto

class CategoryChoiceField(forms.ModelChoiceField):
     def label_from_instance(self, obj):
         return f"{obj.categoria} | {obj.nome}"

class SubCategoriaInline(admin.TabularInline):
    model = SubCategoriaGasto
    extra = 0

class GastoAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields': ['user', 'descricao', 'valor', 'data', 'sub_categoria']})
    ]
    list_display = ('data', 'descricao', 'valor', 'sub_categoria')
    
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == 'sub_categoria':
            return CategoryChoiceField(queryset=SubCategoriaGasto.objects.all().order_by('-categoria'))
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

class CategoriaGastoAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields': ['nome']})
    ]
    inlines = [SubCategoriaInline]
    
class SubCategoriaAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields': ['nome', 'categoria']})
    ]
    list_display = ('categoria', 'nome')
    
admin.site.register(Gasto, GastoAdmin)
admin.site.register(CategoriaGasto, CategoriaGastoAdmin)
admin.site.register(SubCategoriaGasto, SubCategoriaAdmin) 
admin.site.register(Receita)