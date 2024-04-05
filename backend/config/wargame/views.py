from rest_framework import viewsets
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

import json
from django.http import HttpResponse

from .serializers import WargameSerializer
from .models import Wargame
from .forms import WargameForm

class WargameViewSet(viewsets.ModelViewSet):
    queryset = Wargame.objects.all()
    serializer_class = WargameSerializer

# class WargameCreateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Wargame
#         fields = '__all__'

#     def create(self, validated_data):
#         # 현재 요청을 보낸 사용자를 작성자로 할당
#         user = self.context['request'].user
#         validated_data['author'] = user
#         return super().create(validated_data)




# class WargameCreateAPIView(APIView):
#     def post(self, request, *args, **kwargs):
#         serializer = WargameCreateSerializer(data=request.data, context={'request': request})
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



def wargame_upload(request):
    if request.method == "POST":
        form = WargameForm(request.POST, request.FILES)
        if form.is_valid():
            form.instance.author = request.user
            form.save()
            return HttpResponse(json.dumps({"status": "Success"}))
        else:
            return HttpResponse(json.dumps({"status": "Failed"}))





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