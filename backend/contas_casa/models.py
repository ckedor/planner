from django.db import models

class ContasCasa(models.Model):
    '''
        Representa as contas da casa em um mês. São sempre dividias em 4 e compõe,
        com o model ExtrasContas todas as contas da casa do mês. 
    '''
    
    mes = models.DateField()
    piscina = models.DecimalField(max_digits=10, decimal_places=2)
    faxineira = models.DecimalField(max_digits=10, decimal_places=2)
    internet = models.DecimalField(max_digits=10, decimal_places=2)
    guarda = models.DecimalField(max_digits=10, decimal_places=2)
    luz = models.DecimalField(max_digits=10, decimal_places=2)
    agua = models.DecimalField(max_digits=10, decimal_places=2)
    extra_iptu = models.DecimalField(max_digits=10, decimal_places=2)
    caixinha = models.DecimalField(max_digits=10, decimal_places=2)
    gas = models.DecimalField(max_digits=10, decimal_places=2)
    
class Morador(models.Model):
    nome = models.CharField(max_length=100)

class ContaExtra(models.Model):
    data = models.DateField()
    dono = models.ForeignKey(Morador, on_delete=models.SET_NULL, null=True)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    descricao = models.CharField(max_length=100)
    
class Divida(models.Model):
    '''
       Alguma conta paga para mim ou por mim. 
       O valor negativo representa dívida minha para o MORADOR.
       O valor positivo representa dívida do morador para MIM. 
    '''
    morador = models.ForeignKey(Morador, on_delete=models.SET_NULL, null=True)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    descricao = models.CharField(max_length=100)