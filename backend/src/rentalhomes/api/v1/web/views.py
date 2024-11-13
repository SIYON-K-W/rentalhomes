from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status

from web.models import Location
from api.v1.web.serializers import LocationSerializer


@api_view(["GET"])
@permission_classes([AllowAny])
def list_locations(request):
    instances = Location.objects.all()
    if not instances:
        return Response({"data":{"status_id":404, "message": "No locations found."}}, status=status.HTTP_404_NOT_FOUND)
    serializer = LocationSerializer(instances, many=True)
    response_data = {
        "status_id": 200,
        "data": serializer.data
    }
    return Response(response_data, status=status.HTTP_200_OK)


