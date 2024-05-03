from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

app_name = 'ctf'

router = DefaultRouter()
router.register('',CTFchallengeViewSet)
router.register('',CTFViewSet)
router.register('',CTFUserViewSet)

#register
urlpatterns = [
    path('', include(router.urls)),
    path('submit-flag', SubmitCTFFlagAPI.as_view(), name='submit_flag'),
]