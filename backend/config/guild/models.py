from django.db import models

# 길드 정보
class Guild(models.Model):
    guild_id = models.CharField(max_length=100, unique=True)
    guild_quiz_list = models.JSONField(default=list)
    ctf_id = models.CharField(max_length=100)
    guild_name = models.CharField(max_length=100)
    # guild_birth = user_birth = models.DateField()

    def __str__(self):
        return self.guild_name
