from rest_framework import serializers
from .models import UserProfile

class UsersSerializer(serializers.ModelSerializer):
    img = serializers.ImageField(use_url=True)
    
    class Meta:
        model = UserProfile
        fields = '__all__'