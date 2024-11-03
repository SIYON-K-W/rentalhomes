from django.urls import path
from api.v1.profile.views import owner_profile,customer_profile

urlpatterns = [
    path('owner/', owner_profile),
    path('customer/', customer_profile)
]
