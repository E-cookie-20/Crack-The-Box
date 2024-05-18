from rest_framework import viewsets
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

# import json
# from django.http import HttpResponse

from .serializers import WargameSerializer, WargameCreateSerializer
from .models import Wargame
from .forms import WargameForm

class WargameViewSet(viewsets.ModelViewSet):
    queryset = Wargame.objects.all()
    serializer_class = WargameSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if request.user.is_authenticated:  # 사용자가 인증되었는지 확인
            serializer.save(author=request.user)  # 인증된 사용자일 경우 작성자로 저장
        else:
            # 사용자가 인증되지 않았을 경우 작성자 필드를 빈 상태로 저장하거나 다른 처리를 수행할 수 있습니다.
            serializer.save(author=None)
            pass
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)





class SubmitFlagAPI(APIView):
    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'quiz_flag': openapi.Schema(type=openapi.TYPE_STRING),
                'id': openapi.Schema(type=openapi.TYPE_INTEGER),
            }
        ),
        responses={200: '정답입니다!', 400: '틀렸습니다. 다시 시도하세요.'},
    )
    def post(self, request):
        if request.method == "POST":
            quiz_flag = request.data.get('quiz_flag')
            id = request.data.get('id')

            try:
                quiz = Wargame.objects.get(id=id)
            except Wargame.DoesNotExist:
                return Response({'message': '해당 ID를 가진 문제가 존재하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

            if quiz_flag == quiz.quiz_flag:
                # 나중에 user 진짜 생기면 주석 풀기
                # user = request.user.User
                # user.user_quiz_solve.add(quiz)
                return Response({'message': '정답입니다!'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': '틀렸습니다. 다시 시도하세요.'}, status=status.HTTP_400_BAD_REQUEST)