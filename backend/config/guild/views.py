from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from .models import Guild_Wargame, Guild
from .serializers import Guild_WargameSerializer, GuildSerializer

from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class Guild_WargameViewSet(viewsets.ModelViewSet):
    queryset = Guild_Wargame.objects.all()
    serializer_class = Guild_WargameSerializer

    def create(self, request, *args, **kwargs):  
        # Serializer 인스턴스 생성
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        if request.user.is_authenticated():
            serializer.save(author=request.user)
        else:
            serializer.save(author=None)
            pass
        # Serializer 저장
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class GuildViewSet(viewsets.ModelViewSet):
    queryset = Guild.objects.all()
    serializer_class = GuildSerializer

    def create(self, request, *args, **kwargs):
        # Serializer 인스턴스 생성
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        if request.user.is_authenticated():
            serializer.save(guild_leader=request.user)
        else:
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
                quiz = Guild_Wargame.objects.get(id=id)
            except Guild_Wargame.DoesNotExist:
                return Response({'message': '해당 ID를 가진 문제가 존재하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

            if quiz_flag == quiz.quiz_flag:
                # 나중에 user 진짜 생기면 주석 풀기
                # user = request.user.User
                # user.user_quiz_solve.add(quiz)
                return Response({'message': '정답입니다!'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': '틀렸습니다. 다시 시도하세요.'}, status=status.HTTP_400_BAD_REQUEST)