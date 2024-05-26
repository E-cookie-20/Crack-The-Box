from rest_framework import serializers
from .models import CTF, CTF_challenge,CTF_user


#url에서 guild_id 받아와서 해당 guild_id에 있는 ctf들만 serialize함
class GuildCTFSerializer(serializers.ModelSerializer): 
    class Meta:
        model = CTF
        fields = '__all__'

    def to_representation(self, instance):
        # request의 query parameter에서 'guild_id'를 가져옴
        guild_id = self.context.get('request').query_params.get('guild_id')

        if guild_id:
            instance = CTF.objects.filter(guild_id=guild_id)
        
        return super().to_representation(instance)


class CTFUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CTF_user
        fields = '__all__'
        
class CTFSerializer(serializers.ModelSerializer): 
    class Meta:
        model = CTF
        fields = '__all__'


class CTFchallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CTF_challenge
        fields = '__all__'

