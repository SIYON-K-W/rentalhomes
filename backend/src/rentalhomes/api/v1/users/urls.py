from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from api.v1.users import views


urlpatterns = [
    path("locations/",views.list_locations),
    path('login/', views.login, name='token_obtain_pair'),
    path('signup/', views.signup),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]


