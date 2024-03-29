from rest_framework import viewsets
from .models import Wargame
from .serializers import WargameSerializer

class WargameViewSet(viewsets.ModelViewSet):
    queryset = Wargame.objects.all()
    serializer_class = WargameSerializer
