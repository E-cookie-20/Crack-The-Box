from rest_framework import viewsets
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

import json
from django.http import HttpResponse

from .serializers import WargameSerializer, WargameCreateSerializer
from .models import Wargame
from .forms import WargameForm

class WargameViewSet(viewsets.ModelViewSet):
    queryset = Wargame.objects.all()
    serializer_class = WargameSerializer


class WargameUploadAPI(APIView):
    @swagger_auto_schema(
        request_body=WargameCreateSerializer,
        responses={201: WargameSerializer()},
    )
    def post(self, request, format=None):
        serializer = WargameCreateSerializer(data=request.data)
        if serializer.is_valid():
            # Assign the current user to the author field before saving
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# 오류: "Method Not Allowed: /wargame/submit-flag/" -> 뭔가 POST 요청에 대한게 막혀있는것 같음...
# 
class SubmitFlagAPI(APIView):
    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'flag': openapi.Schema(type=openapi.TYPE_STRING),
                'quiz_id': openapi.Schema(type=openapi.TYPE_INTEGER),
            }
        ),
        responses={200: '정답입니다!', 400: '틀렸습니다. 다시 시도하세요.'},
    )
    def post(self, request):
        flag = request.data.get('flag')
        quiz_id = request.data.get('quiz_id')

        try:
            quiz = Wargame.objects.get(id=quiz_id)
        except Wargame.DoesNotExist:
            return Response({'message': '해당 ID를 가진 문제가 존재하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

        if flag == quiz.flag:
            user_profile = request.user.userprofile
            user_profile.user_quiz_solve.add(quiz)
            return Response({'message': '정답입니다!'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': '틀렸습니다. 다시 시도하세요.'}, status=status.HTTP_400_BAD_REQUEST)