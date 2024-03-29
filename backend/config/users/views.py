from .models import Users
from .serializers import UsersSerializer
from rest_framework import viewsets


class MembersViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer