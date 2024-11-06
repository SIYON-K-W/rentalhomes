from django.urls import path

from api.v1.connect.views import connect_house

urlpatterns = [
    path('connect/<int:house_id>/', connect_house),
]
