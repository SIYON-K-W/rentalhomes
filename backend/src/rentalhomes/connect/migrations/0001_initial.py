# Generated by Django 5.1.2 on 2024-11-02 09:02

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('houses', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Connection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('connected_at', models.DateTimeField(auto_now_add=True)),
                ('customer', models.ForeignKey(limit_choices_to={'user_type': 'customer'}, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('house', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='houses.houselisting')),
            ],
            options={
                'constraints': [models.UniqueConstraint(fields=('customer', 'house'), name='unique_customer_house_connection')],
            },
        ),
    ]