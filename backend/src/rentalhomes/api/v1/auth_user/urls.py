from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from api.v1.auth_user import views


urlpatterns = [
    path('login/', views.login, name='token_obtain_pair'),
    path('register/', views.signup),
    path('logout/', views.logout),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]


