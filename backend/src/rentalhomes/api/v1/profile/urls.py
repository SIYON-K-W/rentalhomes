from django.urls import path

from api.v1.profile.views import customer_dashboard,owner_dashboard,get_user_location,get_connected_customers

urlpatterns = [
    path('owner/', owner_dashboard),
    path('owner/location/', get_user_location),
    path('owner/<int:house_id>/connected-customers/', get_connected_customers),
    path('customer/', customer_dashboard),
]
