from rest_framework import serializers
from .models import Guild_Wargame, Guild
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

class GuildSerializer(serializers.ModelSerializer):
    guild_wargame_list = Guild_WargameSerializer(many=True, read_only=True)
    members = UserSerializer(many=True, read_only=True, source='get_members')

    class Meta:
        model = Guild
        fields = '__all__'
