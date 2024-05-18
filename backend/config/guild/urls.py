from django.urls import path, include
from .views import GuildViewSet, Guild_WargameViewSet, SubmitFlagAPI
from rest_framework.routers import DefaultRouter

app_name = 'guild'

router = DefaultRouter()
router.register('', GuildViewSet)
router.register('guild-wargame', Guild_WargameViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('submit-flag', SubmitFlagAPI.as_view(), name='submit_flag'),
]