# Generated by Django 5.0.3 on 2024-06-07 12:11

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
        ('wargame', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='user_quiz_solve',
            field=models.ManyToManyField(blank=True, related_name='solved_by_users', to='wargame.wargame'),
        ),
    ]
