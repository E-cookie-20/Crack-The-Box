from django.db import models
from django.contrib.auth.models import Guild,User
from users.models import UserProfile


# 문제 유형 선택지
CHALLENGE_CATEGORIES = [
    ('web', 'Web'),
    ('system', 'System Hacking'),
    ('crypto', 'Crypto'),
    ('forensics', 'Forensics'),
    ('reversing', 'Reverse Engineering'),
    ('misc', 'Miscellaneous'),
]

class CTF(models.Model):
    ctf_id = models.CharField(max_length=20) #ctf id
    ctf_start = models.DateTimeField() #ctf 시작일
    ctf_fin = models.DateTimeField() #ctf 종료일
    ctf_description = models.CharField(max_length=100) #ctf 설명
    ctf_name = models.CharField(max_length=20) #ctf 이름
    ctf_onging=models.models.BooleanField(default=False) #현재 ctf 진행중인지 여부
    guild = models.ForeignKey(Guild, on_delete=models.CASCADE) #출제 길드
    
    #ctf_user_list=~~
    #problem_list....   
    def __str__(self):
        return self.ctf_name

#ctf challenge 모델 -> 문제 점수(challenge_pts) 추가 
class CTF_challenge(models.Model):
    ctf_id = models.ForeignKey(CTF, on_delete=models.CASCADE) #문제가 등록되어있는 CTF
    challenge_description = models.TextField()  # 문제 설명
    challenge_flag = models.CharField(max_length=100)  # 문제 플래그
    challenge_title = models.CharField(max_length=200)  # 문제명
    challenge_type = models.CharField(max_length=20, choices=CHALLENGE_CATEGORIES)  # 문제 유형 선택
    challenge_pts= models.PositiveIntegerField() #문제 점수
    challenge_file = models.FileField(upload_to='challange_files/', null=True) # 문제 파일 업로드(zip 권장)



class CTF_user(UserProfile): #ctf 종료되면 이거 다 clear해야함
    # 푼 문제 (JSONField 사용 or ManyToManyField로 별도의 문제 모델과 연결 가능)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE) # UserProfile 모델과 연결
    user_quiz_solve = models.ManyToManyField(CTF_challenge, related_name='solved_by_users')
    user_pts=models.models.PositiveIntegerField(default=0) #점수

    def get_guild_id(self): #길드 아이디
        return self.user_profile.guild_id
    