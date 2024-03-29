from rest_framework import serializers
from .models import Users

class UsersSerializer(serializers.ModelSerializer):
    img = serializers.ImageField(use_url=True)
    
    class Meta:
        model = Users
        fields = '__all__'