from django.urls import path, include
from .views import WargameViewSet, SubmitFlagAPI, wargame_upload
from rest_framework.routers import DefaultRouter

app_name = 'wargame'

router = DefaultRouter()
router.register('', WargameViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('submit-flag/', SubmitFlagAPI.as_view(), name='submit_flag'),
    path('upload', wargame_upload, name='upload')
]