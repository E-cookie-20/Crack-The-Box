from rest_framework import serializers
from .models import CTF, CTF_challenge,CTF_user

class CTFSerializer(serializers.ModelSerializer):
    class Meta:
        model = CTF
        fields = '__all__'

    def to_representation(self, instance):
        # request의 query parameter에서 'guild_id'를 가져옴
        guild_id = self.context.get('request').query_params.get('guild_id')

        if guild_id:
            instance = CTF.objects.filter(guild_id=guild_id)

        return super().to_representation(instance)


class CTFchallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CTF_challenge
        fields = '__all__'

class CTFUserSerializer(serializers.ModelSerializer):
    class Meta:
        model=CTF_user
        fields='__all__'