from django.contrib.auth.models import AbstractUser
from django.db import models
from wargame.models import Wargame
from guild.models import Guild

class User(AbstractUser):
    user_birth = models.DateField(null=True, blank=True)
    user_phone = models.CharField(max_length=20, blank=True, null=True)
    user_gender = models.CharField(max_length=1, choices=(('M', 'Male'), ('F', 'Female')), blank=True)
    user_quiz_solve = models.ManyToManyField(Wargame, related_name='solved_by_users', blank=True)
    user_guild = models.OneToOneField(Guild, blank=True, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.username

"""
from django.db import models
from django.contrib.auth.models import User
from wargame.models import Wargame 

from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    guild_id = models.CharField(max_length=100, blank=True, null=True)
    user_birth = models.DateField(null=True, blank=True)
    user_phone = models.CharField(max_length=20, blank=True, null=True)
    user_gender = models.CharField(max_length=1, choices=(('M', 'Male'), ('F', 'Female')), blank=True)

class UserProfile(models.Model):
    # User 모델을 OneToOneField로 연결하여 확장
    # 기본 User에 사용자 id(id), 이메일(email), 이름(username)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    
    # 길드 ID (예: CharField 사용, 필요에 따라 unique=True 추가 가능)
    guild_id = models.CharField(max_length=100, blank=True, null=True)
    
    # 생년월일
    user_birth = models.DateField()
    
    # 전화번호
    user_phone = models.CharField(max_length=20, blank=True, null=True)
    
    # 성별 (예: 'M' for male, 'F' for female)
    user_gender = models.CharField(max_length=1, choices=(('M', 'Male'), ('F', 'Female')))
    
    # 푼 문제 (JSONField 사용 or ManyToManyField로 별도의 문제 모델과 연결 가능)
    user_quiz_solve = models.ManyToManyField(Wargame, related_name='solved_by_users')
    # user_quiz_solve = models.JSONField(default=list)
    

    def __str__(self):
        return self.user.username
"""