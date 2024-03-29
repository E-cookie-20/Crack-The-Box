from rest_framework import serializers
from .models import Wargame

class WargameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wargame
        fields = '__all__'
