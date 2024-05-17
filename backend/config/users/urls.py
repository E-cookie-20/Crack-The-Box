from django.urls import path, include
from .views import UsersViewSet
from rest_framework.routers import DefaultRouter
#from .views import UserLoginAPIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

app_name = 'users'

router = DefaultRouter()
router.register('', UsersViewSet)

urlpatterns = [
    path('', include(router.urls)),
    #path('login/', UserLoginAPIView.as_view(), name='user-login'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]