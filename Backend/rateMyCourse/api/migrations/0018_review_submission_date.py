# Generated by Django 4.2.6 on 2023-12-05 15:39

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_alter_review_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='submission_date',
            field=models.DateField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
