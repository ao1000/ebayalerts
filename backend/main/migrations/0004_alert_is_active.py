# Generated by Django 2.0.5 on 2018-06-08 12:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_alert_date_created'),
    ]

    operations = [
        migrations.AddField(
            model_name='alert',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]
