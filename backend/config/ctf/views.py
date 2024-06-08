from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from rest_framework.decorators import action

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .serializers import CTFSerializer, CTFchallengeSerializer, CTFUserSerializer
from .models import CTF, CTF_challenge, CTF_user
from users.models import User
from .forms import challangeForm


#@method_decorator(login_required, name='dispatch')
class CTFViewSet(viewsets.ModelViewSet):
    queryset = CTF.objects.all()  # 모든 CTF 객체를 조회
    serializer_class = CTFSerializer  # CTF 객체를 시리얼라이즈할 때 사용할 시리얼라이저 클래스 지정

    
    #프론트에서 확인 필요
    @action(methods=["post"], detail=False, url_path="chall", url_name="chall")
    def route2chall(self, request, *args, **kwargs):
        #user_id=request.user.id
        #print("hye",user_id)
        # "chall"에 대한 처리를 수행하는 다른 viewset으로 연결하거나 Response 반환
        return CTFchallengeViewSet.as_view({
                'get': 'list',
                'post': 'create',
                'put': 'update',
                'patch': 'partial_update',
                'delete': 'destroy'
        })(request._request, *args, **kwargs)  

    # retrieve 메서드 오버라이드: 특정 CTF의 상세 정보 조회 시 호출
    def retrieve(self, request, *args, **kwargs):
        ctf_id = kwargs.get('pk')  # URL에서 ctf_id를 가져옴
        
        '''
        user_id=request.user.id
        print("userid",user_id)
        '''
        #user_id=1
        ctf =CTF.objects.get(pk=ctf_id)  # 해당 ctf_id의 CTF 객체를 조회
        participate_users = ctf.participate_user.all()
        participate_users_data = CTFUserSerializer(participate_users, many=True).data

        challenges = CTF_challenge.objects.filter(ctf_id=ctf_id)  # 해당 CTF에 속한 모든 챌린지 조회
        challenge_serializer = CTFchallengeSerializer(challenges, many=True)  # 챌린지들을 시리얼라이즈
        ctf_detail_serializer=CTFSerializer(ctf)    
            
        '''
            로그인 되어있었을 때 swagger test를 위한 코드
            
            # 임시 사용자 생성
            temp_user = User.objects.filter(id=1)
            temp_user_id = temp_user.id
            
            # 임시 사용자로 request.user 설정
            request.user = temp_user
        '''


        #만약 일반 사용자라면 자기 정보도 추가해서 보내줌
        ctf_user=CTF_user.objects.filter(user_id=user_id, ctf_id=ctf_id).first()
        ctf_user_id=ctf_user.id
        #ctf_user_id=1 #테스트용
        ctf_user_name=ctf_user.ctf_user_name
        #딕셔너리를 사용하여 데이터를 합침
        response_data = {
                'ctf_detail': ctf_detail_serializer.data,
                'challenges': challenge_serializer.data,
                'participate_users': participate_users_data, #랭킹 기능에 필요
                'ctf_user_id': ctf_user_id, #이부분 수정 필요..테스트여서
                'ctf_user_name':ctf_user_name 
        }
            
        return Response(response_data)  # 시리얼라이즈된 챌린지와 참여자 데이터를 응답으로 반환


class CTFUserViewSet(viewsets.ModelViewSet):
    queryset=CTF.objects.all()
    serializer_class=CTFUserSerializer
  


class CTFchallengeViewSet(viewsets.ModelViewSet):
    queryset = CTF_challenge.objects.all()
    serializer_class = CTFchallengeSerializer



'''
class CTFChallengeListView(APIView):
    def get(self, request, ctf_id):
        ctf_challenges = CTF_challenge.objects.filter(ctf_id=ctf_id)
        serializer = CTFchallengeSerializer(ctf_challenges, many=True)
        return Response(serializer.data)
'''

#@method_decorator(login_required, name='dispatch')
class ParticipateCTFAPI(APIView):
    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'user_id':openapi.Schema(type=openapi.TYPE_INTEGER),
            }
        ),
        #responses={200: '정답입니다!', 400: '틀렸습니다. 다시 시도하세요.'},
    )    
    def post(self, request, *args, **kwargs):
        user_id=request.data.get('user_id')
        #user_id=request.user.id <-로그인 연결되면 이걸로
        ctf_id = kwargs.get('ctf_id')  # URL에서 ctf_id를 가져옴
        try:
        # 이미 해당 사용자와 CTF 간의 관계가 있는지 확인
            ctf_user = CTF_user.objects.filter(user_id=user_id, ctf_id=ctf_id).first()
            if ctf_user is None:
            # 모델의 인스턴스를 생성 및 저장
                ctf_user = CTF_user.objects.create(user_id=user_id, ctf_id=ctf_id, user_pts=0)
            return Response({'ctf_user_id': ctf_user.id}, status=status.HTTP_200_OK)            
        except Exception as e:
            return Response({'message': '이미 참여 중인 CTF입니다.'}, status=status.HTTP_400_BAD_REQUEST)   
        
#@method_decorator(login_required, name='dispatch')
class SubmitCTFFlagAPI(APIView):
    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'ctf_user_id':openapi.Schema(type=openapi.TYPE_INTEGER),
                'challenge_flag': openapi.Schema(type=openapi.TYPE_STRING),
                'ctf_chall_id': openapi.Schema(type=openapi.TYPE_INTEGER),
            }
        ),
        responses={200: '정답입니다!', 400: '틀렸습니다. 다시 시도하세요.'},
    )
    def post(self, request, *args, **kwargs):
        ctf_user_id = request.data.get('ctf_user_id')
        id = request.data.get('ctf_chall_id') #ctf_chall_id
        ctf_user = CTF_user.objects.get(user=ctf_user_id)
        submitted_flag = request.data.get('challenge_flag')

        try:
            challenge = CTF_challenge.objects.get(id=id)
        except CTF_challenge.DoesNotExist:
            return Response({'message': '해당 ID를 가진 문제가 존재하지 않습니다.'}, status=400)

        if challenge in ctf_user.user_chall_solve.all():
            return Response({'message': '이미 푼 문제입니다!'}, status=400)        
        elif challenge.challenge_flag == submitted_flag:
            ctf_user.user_chall_solve.add(challenge)
            ctf_user.user_pts += challenge.challenge_pts
            ctf_user.save()
            return Response({'message': '정답입니다!', 'points': ctf_user.user_pts}, status=200)
        else:
            return Response({'message': '틀렸습니다. 다시 시도하세요.'}, status=400)
