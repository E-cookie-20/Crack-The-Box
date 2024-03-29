from .models import UserProfile
from .serializers import UsersSerializer
from rest_framework import viewsets

from django.urls import reverse_lazy
from django.views import generic
from ..users.forms import CustomUserCreationForm

class MembersViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UsersSerializer


from django.shortcuts import render



class SignUpView(generic.CreateView):
    form_class = CustomUserCreationForm
    success_url = reverse_lazy('login')  # 회원가입 성공 후 리디렉션할 URL
    template_name = 'signup.html'  # 사용할 템플릿 파일명
