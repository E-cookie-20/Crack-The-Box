from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken
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
    

class UserLoginSerializer(serializers.Serializer):
    """
    model = User
    fields = ['username', 'password']
    """

    username = serializers.CharField()
    password = serializers.CharField(
        max_length=128,
        write_only=True
    )
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        username = data.get('username', None)
        password = data.get('password', None)

        if password is None:
            raise serializers.ValidationError(
                'A password is required to log in.'
            )

        user = authenticate(username=username, password=password)

        if user is None:
            raise serializers.ValidationError(
                'A user with this email and password was not found.'
            )

        if not user.is_active:
            raise serializers.ValidationError(
                'This user has been deactivated.'
            )

        refresh = RefreshToken.for_user(user)

        return {
            'username': user.username,
            'token': str(refresh.access_token),
        }