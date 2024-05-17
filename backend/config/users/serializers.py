from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from .models import User
from django.contrib.auth import authenticate

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
