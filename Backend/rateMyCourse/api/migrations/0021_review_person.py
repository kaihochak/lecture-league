# Generated by Django 4.2.6 on 2023-12-06 05:02

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0020_remove_university_logo_university_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='person',
            field=models.ForeignKey(default='test', on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to=settings.AUTH_USER_MODEL, to_field='username'),
        ),
    ]
