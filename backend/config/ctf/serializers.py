from rest_framework import serializers
from .models import CTF, CTF_challenge

class CTFSerializer(serializers.ModelSerializer):
    class Meta:
        model = CTF
        fields = '__all__'

class CTFchallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CTF_challenge
        fields = '__all__'