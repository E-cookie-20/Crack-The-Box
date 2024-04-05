from rest_framework import serializers
from .models import Wargame

class WargameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wargame
        fields = '__all__'

class WargameCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wargame
        exclude = ['author']

    # def create(self, validated_data):
    #     # 현재 요청을 보낸 사용자를 작성자로 할당
    #     user = self.context['request'].user
    #     validated_data['author'] = user
    #     return super().create(validated_data)