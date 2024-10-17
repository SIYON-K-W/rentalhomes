from django.urls import path
from api.v1.houses import views


urlpatterns = [
    path("create/",views.create_house_listing),
    path("list/",views.house_listing_list),
]


