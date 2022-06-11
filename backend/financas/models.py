from django.db import models
from django.contrib.auth.models import User

class CategoriaGasto(models.Model):
    
    nome = models.CharField(max_length=40)
    
    def __str__(self):
        return f"{self.nome}"
    
class SubCategoriaGasto(models.Model):
    
    nome = models.CharField(max_length=40)
    categoria = models.ForeignKey(CategoriaGasto, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.nome}"
    
class Gasto(models.Model):
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    descricao = models.CharField(max_length=150)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    data = models.DateField()
    sub_categoria = models.ForeignKey(SubCategoriaGasto, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.data} - {self.valor} - {self.sub_categoria.categoria.nome}"