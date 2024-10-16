from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView

from users.models import Location
from api.v1.users.serializers import LocationSerializer,CustomTokenObtainPairSerializer

@api_view(["GET"])
@permission_classes([AllowAny])
def list_locations(request):
    instances = Location.objects.all()
    if not instances:
        return Response({"status_id":6001, "message": "No locations found."}, status=status.HTTP_404_NOT_FOUND)
    serializer = LocationSerializer(instances, many=True)
    response_data = {
        "status_id": 6000,
        "data": serializer.data
    }
    return Response(response_data, status=status.HTTP_200_OK)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer