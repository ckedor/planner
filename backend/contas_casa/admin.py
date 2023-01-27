from django.contrib import admin

from contas_casa.models import ContaExtra, ContasCasa, Divida, Morador

admin.site.register(Morador)
admin.site.register(ContaExtra)
admin.site.register(Divida) 
admin.site.register(ContasCasa)