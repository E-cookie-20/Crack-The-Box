from .models import UserProfile
from .serializers import UsersSerializer
from rest_framework import viewsets


class MembersViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UsersSerializer