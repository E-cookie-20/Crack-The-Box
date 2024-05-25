from django.db import models
from django.contrib.auth.models import AbstractUser
from guild.models import Guild
from users.models import User

# 문제 유형 선택지
CHALLENGE_CATEGORIES = [
    ('web', 'Web'),
    ('system', 'System Hacking'),
    ('crypto', 'Crypto'),
    ('forensics', 'Forensics'),
    ('reversing', 'Reverse Engineering'),
    ('misc', 'Miscellaneous'),
]


#ctf 끝나고도 풀수는 있게!
class CTF(models.Model):
    
    ctf_start = models.DateTimeField() #ctf 시작일
    ctf_fin = models.DateTimeField() #ctf 종료일
    ctf_description = models.CharField(max_length=100) #ctf 설명
    ctf_name = models.CharField(max_length=20) #ctf 이름
    ctf_onging=models.BooleanField(default=False) #현재 ctf 진행중인지 여부
    guild = models.ForeignKey(Guild, on_delete=models.CASCADE,null=True) #출제 길드

    def __str__(self):
        return self.ctf_name


#ctf challenge 모델 -> 문제 점수(challenge_pts) 추가 
class CTF_challenge(models.Model):
    ctf_id = models.ForeignKey(CTF, on_delete=models.CASCADE) #문제가 등록되어있는 CTF
    challenge_name = models.CharField(max_length=20) #문제 이름
    challenge_description = models.TextField()  # 문제 설명
    challenge_flag = models.CharField(max_length=100)  # 문제 플래그
    challenge_title = models.CharField(max_length=200)  # 문제명
    challenge_type = models.CharField(max_length=20, choices=CHALLENGE_CATEGORIES)  # 문제 유형 선택
    challenge_pts= models.PositiveIntegerField() #문제 점수
    challenge_file = models.FileField(upload_to='challange_files/', blank=True, null=True) # 문제 파일 업로드(zip 권장)


class CTF_user(models.Model): #ctf 종료되면 이거 다 clear해야함
    # 푼 문제 (JSONField 사용 or ManyToManyField로 별도의 문제 모델과 연결 가능)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ctf_user') #one to one으로 하면 user 객체 자체가 저장됨;;;
    ctf=models.ForeignKey(CTF,on_delete=models.CASCADE,related_name='participate_user',blank=True, null=True)
    user_chall_solve = models.ManyToManyField(CTF_challenge, related_name='solved_by_users',blank=True, null=True)
    user_pts=models.PositiveIntegerField(default=0) #점수
