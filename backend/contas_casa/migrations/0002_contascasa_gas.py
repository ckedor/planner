# Generated by Django 4.1.4 on 2023-01-19 19:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contas_casa', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='contascasa',
            name='gas',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
            preserve_default=False,
        ),
    ]
