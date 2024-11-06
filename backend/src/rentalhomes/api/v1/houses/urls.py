from django.urls import path

from api.v1.houses import views


urlpatterns = [
    path("",views.houses),
    path("house/create/",views.create_house_listing),
    path("house/<int:pk>/",views.house),
]


