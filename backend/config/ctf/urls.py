from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

app_name = 'ctf'

router = DefaultRouter()
router.register('',CTFViewSet)
router.register('chall',CTFchallengeViewSet)


#register
urlpatterns = [
    path('', include(router.urls)),
    path('submit-flag', SubmitCTFFlagAPI.as_view(), name='submit_flag'),
    path('<int:ctf_id>/', CTFChallengeListView.as_view(), name='ctf_challenge_list'),

    #path('/ctf/<ctf_chall_id>', CTFchallengeViewSet.as_view()),

]