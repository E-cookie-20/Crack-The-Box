from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UsersSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        # fields = '__all__'
        exclude = ['groups', 'user_permissions', 'user_quiz_solve']  # 제외할 필드 목록
        extra_kwargs = {'password': {'write_only': True}}
        

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        user = User.objects.create(**validated_data)
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        
        user = self.user or self.context['request'].user

        # 사용자가 푼 퀴즈 목록의 ID를 리스트로 가져옴
        user_quiz_ids = list(user.user_quiz_solve.values_list('id', flat=True))
        
        data['user'] = {
            'user_id': user.id,
            'user_name': user.username,
            'user_birth':user.user_birth,
            'user_phone':user.user_phone,
            'user_gender':user.user_gender,
            'user_quiz_solve':user_quiz_ids,
            'user_email': user.email,
            'guild_id': user.user_guild.id if user.user_guild else None,
        }
        return data