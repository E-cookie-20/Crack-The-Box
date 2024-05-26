from rest_framework import serializers
from .models import Guild_Wargame,Guild, GuildNotice
from ctf.models import CTF

from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'guild_admin', 'guild_quiz_solvers']  # 필요한 필드를 여기에 추가

class Guild_WargameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guild_Wargame
        exclude = ['author', 'quiz_solvers']
        # fields = '__all__'

class GuildSerializer(serializers.ModelSerializer):
    guild_wargame_list = Guild_WargameSerializer(many=True, read_only=True)
    members = UserSerializer(many=True, read_only=True, source='get_members')

    class Meta:
        model = Guild
        fields = '__all__'


class Guild_CTFSerializer(serializers.ModelSerializer):
    class Meta:
        model = CTF
        fields = ['ctf_name','ctf_onging']


class GuildNoticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuildNotice
        fields = ['id', 'guild', 'title', 'content', 'created_at']
        read_only_fields = ['id', 'guild', 'created_at']

