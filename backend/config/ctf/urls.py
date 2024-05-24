from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

app_name = 'ctf'

router = DefaultRouter()
router.register('ctf',CTFViewSet)
router.register('',CTFchallengeViewSet)


#register
urlpatterns = [
    path('', include(router.urls)),
    path('ctf/submit-flag', SubmitCTFFlagAPI.as_view(), name='submit_flag'),
    #path('/ctf/<ctf_chall_id>', CTFchallengeViewSet.as_view()),

]