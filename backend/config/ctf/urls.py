from django.urls import path, include
from rest_framework.routers import DefaultRouter

app_name = 'ctf'

router = DefaultRouter()
#register
urlpatterns = [
    path('', include(router.urls)),
    
]