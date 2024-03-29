from django.urls import path, include
from .views import WargameViewSet
from rest_framework.routers import DefaultRouter

app_name = 'wargame'

router = DefaultRouter()
router.register('', WargameViewSet)

urlpatterns = [
    path('', include(router.urls))
]