# Generated by Django 5.1.7 on 2025-04-20 11:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_alter_item_image_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='balance',
            field=models.IntegerField(default=0),
        ),
    ]
