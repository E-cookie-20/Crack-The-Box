from django.db import models
from django.contrib.auth.models import Group

# 길드 정보
class Guild(models.Model):
    group = models.OneToOneField(Group, on_delete=models.CASCADE, related_name='guild')
    guild_id = models.CharField(max_length=100, unique=True)
    guild_quiz_list = models.JSONField(default=list)
    ctf_id = models.CharField(max_length=100)
    guild_name = models.CharField(max_length=100)
    # guild_birth = user_birth = models.DateField()

    def __str__(self):
        return self.guild_name
