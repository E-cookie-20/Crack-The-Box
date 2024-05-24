from django.urls import path, include
from .views import GuildViewSet, Guild_WargameViewSet, SubmitFlagAPI, GuildMembersAPIView, InviteMemberToGuildAPIView, WargameSolversAPIView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'guild', GuildViewSet, basename='guild')
router.register(r'guild-wargame', Guild_WargameViewSet, basename='guild-wargame')

urlpatterns = [
    path('', include(router.urls)),
    path('submit-flag', SubmitFlagAPI.as_view(), name='submit_flag'),
    path('members/<int:pk>', GuildMembersAPIView.as_view(), name='members'),
    path('invite-member/<int:pk>', InviteMemberToGuildAPIView.as_view(), name='invite_member'),
    path('guild-wargame/solvers/<int:pk>', WargameSolversAPIView.as_view(), name='wargame_solvers'),
]