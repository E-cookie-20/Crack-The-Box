from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

# 문제 유형 선택지
QUIZ_CATEGORIES = [
    ('web', 'Web'),
    ('system', 'System Hacking'),
    ('crypto', 'Crypto'),
    ('forensics', 'Forensics'),
    ('reversing', 'Reverse Engineering'),
    ('misc', 'Miscellaneous'),
]

QUIZ_LEVELS = [
    ('high', 'High'),
    ('intermediate', 'Intermediate'),
    ('beginner', 'beginner'),
]


class Wargame(models.Model):
    # author = models.ForeignKey(User, on_delete=models.CASCADE, null=True)  # 작성자 ID (User 모델과의 연결), 나중에 null=True 바꾸기...
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name='wargames'
    )

    quiz_description = models.TextField()  # 문제 설명
    quiz_flag = models.CharField(max_length=100)  # 문제 플래그
    quiz_title = models.CharField(max_length=100)  # 문제명
    quiz_level = models.CharField(max_length=20, choices=QUIZ_LEVELS)  # 문제 난이도
    quiz_type = models.CharField(max_length=20, choices=QUIZ_CATEGORIES)  # 문제 유형 선택
    quiz_file = models.FileField(upload_to='wargame_files/', null=True, blank=True) # 문제 파일 업로드(zip 권장)

    def __str__(self):
        return self.quiz_title