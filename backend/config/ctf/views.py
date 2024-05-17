from django.shortcuts import render
from rest_framework import status,viewsets
from rest_framework.views import APIView
from rest_framework.response import Response

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .serializers import CTFSerializer, CTFchallengeSerializer,CTFUserSerializer
from .models import CTF,CTF_challenge, CTF_user
from .forms import challangeForm
from django.db.models import F, Count


class CTFViewSet(viewsets.ModelViewSet):
    queryset = CTF_user.objects.all()
    serializer_class = CTFSerializer
    #serializer_class = CTFUserSerializer

    def top_users(self, request): #10명 내림차순으로 가져오기
        top_users = CTF_user.objects.annotate(rank=Count('user__user_pts') + 1).order_by('-user__user_pts')[:10].values('user__username', 'rank', 'user__user_pts')
        return Response(top_users)

class CTFUserViewSet(viewsets.ModelViewSet):
    queryset=CTF.objects.all()
    serializer_class=CTFSerializer

class CTFchallengeViewSet(viewsets.ModelViewSet):
    queryset = CTF_challenge.objects.all()
    serializer_class = CTFchallengeSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        #해당 길드의 길드원이 맞는지 확인하는 코드 추가해야함
        #맞으면 ok, 아니면 abort
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)



class SubmitCTFFlagAPI(APIView):
    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'flag': openapi.Schema(type=openapi.TYPE_STRING),
                'challenge_id': openapi.Schema(type=openapi.TYPE_INTEGER),
            }
        ),
        responses={200: '정답입니다!', 400: '틀렸습니다. 다시 시도하세요.'},
    )
    def submit_challenge(request):
        user = request.user
        id = request.data.get('ctf_chall_id')
        ctf_user = CTF_user.objects.get(user=user)
        challenge = CTF_challenge.objects.get(id=id)
        submitted_flag = request.POST.get('challenge_flag')

        try:
            challenge = CTF_challenge.objects.get(id=id)
        except CTF_challenge.DoesNotExist:
            return Response({'message': '해당 ID를 가진 문제가 존재하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

        if challenge.challenge_flag == submitted_flag:
            if challenge not in ctf_user.user_quiz_solve.all():
                ctf_user.user_quiz_solve.add(challenge)
                ctf_user.user_pts += challenge.challenge_pts
                ctf_user.save()
                return Response({'message': '정답입니다!', 'points': ctf_user.user_pts}, status=200)
            else:
                return Response({'message': '이미 푼 문제입니다!'}, status=400)
        else:
            return Response({'message': '틀렸습니다. 다시 시도하세요.'}, status=400)

        


#길드에서 ctf관리
#ctf 안의 문제들은 ctf가 종료되고 난 후에 워게임으로 이전하지 않음
#ctf 개최



#ctf삭제 
#ctf 문제 보기,제출... ->워게임꺼 가져오기.


#ctf 생성....
#실시간 랭킹기능 (?)

#ctf 참가하기 -> 참가하면 이상한 모델 생성~~~

