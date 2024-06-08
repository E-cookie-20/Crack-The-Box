from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from .models import Guild_Wargame, Guild
from users.models import User
from .serializers import Guild_WargameSerializer, GuildSerializer, UserSerializer, Guild_CTFSerializer

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from rest_framework.decorators import action
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.shortcuts import get_object_or_404

class Guild_WargameViewSet(viewsets.ModelViewSet):
    queryset = Guild_Wargame.objects.all()
    serializer_class = Guild_WargameSerializer


class WargameSolversAPIView(APIView):
    def get(self, request, pk):
        wargame = get_object_or_404(Guild_Wargame, pk=pk)
        solvers = wargame.get_solvers()
        solvers_data = [
            {
                'id': solver.id,
                'username': solver.username,
                'email': solver.email,
                'guild_admin': solver.is_staff,
                'is_author': solver == wargame.author
            }
            for solver in solvers
        ]
        return Response(solvers_data, status=status.HTTP_200_OK)


class GuildViewSet(viewsets.ModelViewSet):
    queryset = Guild.objects.all()
    serializer_class = GuildSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # if request.user.is_authenticated():
        #     user = request.user
        #     user_guild = serializer.save(guild_leader=user)
        #     user.user_guild = user_guild
        #     user.save()
        # else:
        #     serializer.save(guild_leader=None)

        serializer.save()

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
class GuildCTFListView(APIView):
    def get(self, request, pk):
        try:
            guild = Guild.objects.get(pk=pk)
            ctf_list = guild.guild_ctf.all()
            ctf_list_data = Guild_CTFSerializer(ctf_list, many=True).data
            return Response({'guild_CTF_list': ctf_list_data}, status=status.HTTP_200_OK)
        except Guild.DoesNotExist:
            return Response({'error': '해당 ID를 가진 길드가 존재하지 않습니다.'}, status=status.HTTP_404_NOT_FOUND)



    
class GuildWargameListView(APIView):
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]
    def get(self, request, pk):
        try:
            guild = Guild.objects.get(pk=pk)
            wargame_list = guild.guild_wargame_list.all()
            wargame_list_data = Guild_WargameSerializer(wargame_list, many=True).data
            return Response({'guild_wargame_list': wargame_list_data}, status=status.HTTP_200_OK)
        except Guild.DoesNotExist:
            return Response({'error': '해당 ID를 가진 길드가 존재하지 않습니다.'}, status=status.HTTP_404_NOT_FOUND)

          
class GuildMembersAPIView(APIView):
    def get(self, request, pk):
        guild = get_object_or_404(Guild, pk=pk)
        members = guild.members.all()
        serializer = UserSerializer(members, many=True)
        return Response(serializer.data)

class InviteMemberToGuildAPIView(APIView):
    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'username': openapi.Schema(type=openapi.TYPE_STRING),
            },
            required=['username']
        ),
        responses={200: '성공', 400: '잘못된 요청', 404: '해당 사용자를 찾을 수 없음'}
    )
    def post(self, request, pk):
        guild_id = pk
        username = request.data.get('username')  # 요청 본문에서 username 가져오기

        if not username:
            return Response({'message': '유저 이름을 제공해야 합니다.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({'message': '해당 사용자를 찾을 수 없습니다.'}, status=status.HTTP_404_NOT_FOUND)

        user.user_guild_id = guild_id
        user.save()

        return Response({'message': f'{username}님이 길드에 초대되었습니다.'}, status=status.HTTP_200_OK)




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
                # user = request.user.User
                # quiz.quiz_solvers.add(user)
                # quiz.save()
                return Response({'message': '정답입니다!'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': '틀렸습니다. 다시 시도하세요.'}, status=status.HTTP_400_BAD_REQUEST)
            