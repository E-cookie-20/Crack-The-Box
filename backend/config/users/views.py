from django.contrib.auth.models import User
from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializers import UsersSerializer
# from .serializers import UserLoginSerializer
from .models import User
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken


class UsersViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UsersSerializer

    def perform_create(self, serializer):
        serializer.save()

    
"""
def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
"""


