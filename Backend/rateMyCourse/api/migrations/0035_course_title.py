# Generated by Django 4.2.6 on 2023-12-14 08:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0034_rename_ikes_review_likes'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='title',
            field=models.CharField(default='No title available', max_length=50),
        ),
    ]
