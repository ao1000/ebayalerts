# Generated by Django 2.0.5 on 2018-06-01 18:31

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_auto_20180601_1258'),
    ]

    operations = [
        migrations.AddField(
            model_name='alert',
            name='date_created',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
