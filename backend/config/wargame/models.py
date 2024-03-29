from django.db import models
from django.contrib.auth.models import User

# 문제 유형 선택지
QUIZ_CATEGORIES = [
    ('web', 'Web'),
    ('system', 'System Hacking'),
    ('crypto', 'Crypto'),
    ('forensics', 'Forensics'),
    ('reversing', 'Reverse Engineering'),
    ('misc', 'Miscellaneous'),
]


class Wargame(models.Model):
    # quiz_id = models.CharField(max_length=100)  # 문제 ID
    author = models.ForeignKey(User, on_delete=models.CASCADE)  # 작성자 ID (User 모델과의 연결)
    quiz_description = models.TextField()  # 문제 설명
    quiz_flag = models.CharField(max_length=100)  # 문제 플래그
    quiz_title = models.CharField(max_length=200)  # 문제명
    quiz_level = models.IntegerField()  # 문제 난이도
    quiz_type = models.CharField(max_length=20, choices=QUIZ_CATEGORIES)  # 문제 유형 선택
    guild_type = models.CharField()  # 길드 유형 선택

    def __str__(self):
        return self.problem_name