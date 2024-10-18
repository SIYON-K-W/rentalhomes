from django.urls import path
from api.v1.houses import views


urlpatterns = [
    path("create/",views.create_house_listing),
    path("listing/",views.houses),
    path("listing/house/<int:pk>/",views.house),
]


