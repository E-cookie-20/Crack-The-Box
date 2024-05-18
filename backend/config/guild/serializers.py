from rest_framework import serializers
from .models import Guild_Wargame, Guild

class Guild_WargameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guild_Wargame
        fields = '__all__'

class GuildSerializer(serializers.ModelSerializer):
    guild_wargame_list = Guild_WargameSerializer(many=True, read_only=True)

    class Meta:
        model = Guild
        fields = '__all__'
