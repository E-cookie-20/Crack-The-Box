from django.db import models
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

# 문제 난이도 선택지
QUIZ_LEVELS = [
    ('high', 'High'),
    ('intermediate', 'Intermediate'),
    ('beginner', 'Beginner'),
]

class Guild(models.Model):
    """
    Guild 모델은 길드에 대한 정보를 저장합니다.
    """
    guild_name = models.CharField(max_length=100, unique=True)
    guild_leader = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='leader_guilds'
    )
    guild_created_at = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.guild_name
    
    def get_members(self):
        return self.members.all()
    
    def get_wargame_list(self):
        return self.guild_wargame_list.all()


class Guild_Wargame(models.Model):
    """
    Guild Wargame 모델은 각 문제에 대한 정보를 저장합니다.
    """
    guild_id = models.ForeignKey(Guild, related_name='guild_wargame_list', blank=True, on_delete=models.CASCADE)

    # 작성자 ID (User 모델과의 연결)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='guild_wargames'
    )

    quiz_description = models.TextField()  # 문제 설명
    quiz_flag = models.CharField(max_length=100)  # 문제 플래그
    quiz_title = models.CharField(max_length=100)  # 문제명
    quiz_level = models.CharField(max_length=20, choices=QUIZ_LEVELS)  # 문제 난이도
    quiz_type = models.CharField(max_length=20, choices=QUIZ_CATEGORIES)  # 문제 유형 선택
    quiz_file = models.FileField(upload_to='wargame_files/', null=True, blank=True)  # 문제 파일 업로드 (zip 권장)
    quiz_solvers = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='guild_quiz_solvers', blank=True)

    def __str__(self):
        return self.quiz_title
    
    def get_solvers(self):
        return self.quiz_solvers.all()
