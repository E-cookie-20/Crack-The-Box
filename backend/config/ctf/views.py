from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .serializers import CTFSerializer, CTFchallengeSerializer, CTFUserSerializer
from .models import CTF, CTF_challenge, CTF_user, User
from .forms import challangeForm
from django.db.models import Count


# CTFViewSet 정의: CTF 모델의 CRUD 작업을 위한 ViewSet
class CTFViewSet(viewsets.ModelViewSet):
    queryset = CTF.objects.all()  # 모든 CTF 객체를 조회
    serializer_class = CTFSerializer  # CTF 객체를 시리얼라이즈할 때 사용할 시리얼라이저 클래스 지정

    # retrieve 메서드 오버라이드: 특정 CTF의 상세 정보 조회 시 호출
    def retrieve(self, request, *args, **kwargs):
        ctf_id = kwargs.get('pk')  # URL에서 ctf_id를 가져옴
        ctf = get_object_or_404(CTF, pk=ctf_id)  # 해당 ctf_id의 CTF 객체를 조회, 없으면 404 반환
        challenges = CTF_challenge.objects.filter(ctf_id=ctf)  # 해당 CTF에 속한 모든 챌린지 조회
        challenge_serializer = CTFchallengeSerializer(challenges, many=True)  # 챌린지들을 시리얼라이즈
        return Response(challenge_serializer.data)  # 시리얼라이즈된 챌린지 데이터를 응답으로 반환

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
        # get_queryset 메서드 오버라이드: 특정 CTF에 속한 챌린지들만 조회

'''
class CTFChallengeListView(APIView):
    def get(self, request, ctf_id):
        ctf_challenges = CTF_challenge.objects.filter(ctf_id=ctf_id)
        serializer = CTFchallengeSerializer(ctf_challenges, many=True)
        return Response(serializer.data)
'''



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
        id = request.data.get('id') #ctf_chall_id
        ctf_user = CTF_user.objects.get(user=user)
        challenge = CTF_challenge.objects.get(id=id)
        submitted_flag = request.POST.get('challenge_flag')

        try:
            challenge = CTF_challenge.objects.get(id=id)
        except CTF_challenge.DoesNotExist:
            return Response({'message': '해당 ID를 가진 문제가 존재하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

        if challenge.challenge_flag == submitted_flag:
            if challenge not in ctf_user.user_chall_solve.all():
                ctf_user.user_chall_solve.add(challenge)
                ctf_user.user_pts += challenge.challenge_pts
                ctf_user.save()
                return Response({'message': '정답입니다!', 'points': ctf_user.user_pts}, status=200)
            else:
                return Response({'message': '이미 푼 문제입니다!'}, status=400)
        else:
            return Response({'message': '틀렸습니다. 다시 시도하세요.'}, status=400)

        

