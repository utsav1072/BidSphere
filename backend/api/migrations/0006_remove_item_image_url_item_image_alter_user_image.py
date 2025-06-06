# Generated by Django 5.1.7 on 2025-04-19 15:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_user_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='item',
            name='image_url',
        ),
        migrations.AddField(
            model_name='item',
            name='image',
            field=models.ImageField(default='item_default.jpeg', null=True, upload_to='item_images'),
        ),
        migrations.AlterField(
            model_name='user',
            name='image',
            field=models.ImageField(default='image.png', null=True, upload_to='user_images'),
        ),
    ]
