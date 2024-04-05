from rest_framework import viewsets
from .serializers import WargameSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Wargame

class WargameViewSet(viewsets.ModelViewSet):
    queryset = Wargame.objects.all()
    serializer_class = WargameSerializer

# 오류: "Method Not Allowed: /wargame/submit-flag/" -> 뭔가 POST 요청에 대한게 막혀있는것 같음...
class SubmitFlagAPI(APIView):
    def post(self, request):
        flag = request.data.get('flag')
        quiz_id = request.data.get('quiz_id')
        quiz = Wargame.objects.get(id=quiz_id)
        user_profile = request.user.userprofile

        if flag == quiz.flag:
            user_profile.user_quiz_solve.add(quiz)
            return Response({'message': '정답입니다!'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': '틀렸습니다. 다시 시도하세요.'}, status=status.HTTP_400_BAD_REQUEST)