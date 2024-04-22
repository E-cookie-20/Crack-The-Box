from django.urls import path, include
from .views import UsersViewSet
from rest_framework.routers import DefaultRouter
from .views import UserLoginAPIView

app_name = 'users'

router = DefaultRouter()
router.register('', UsersViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', UserLoginAPIView.as_view(), name='user-login'),
]