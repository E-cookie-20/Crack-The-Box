from django.db import models

class Users(models.Model):
    year = models.CharField(max_length=3, null=True, blank=False)#필수 데이터 
    img = models.ImageField(upload_to='static/members/',blank=True) #이미지명은 학번 기준으로 하면 관리하기 좋을듯
    std_id=models.IntegerField(unique=True)
    name = models.CharField(max_length=100,unique=False)
    email = models.EmailField(null=True, blank=True, unique=True)
    comment = models.TextField(max_length=120, blank=True,unique=False)#공백 가능
    insta_link = models.URLField(blank=True,unique=False)
    git_link = models.URLField(null=True, blank=True,unique=False)
    linkedin_link = models.URLField(blank=True,unique=False)
    tf=models.BooleanField(default=False, unique=False)


    def __str__(self):
        return self.name