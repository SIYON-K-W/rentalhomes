from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from api.v1.web import views


urlpatterns = [
    path("locations/",views.list_locations),
]


