# Generated by Django 4.0.5 on 2022-07-20 15:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('financas', '0002_gasto_descricao_gasto_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='Receita',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fonte', models.CharField(max_length=150)),
                ('valor', models.DecimalField(decimal_places=2, max_digits=10)),
                ('data', models.DateField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
