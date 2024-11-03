from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from houses.models import HouseListing
from  connect.models import Connection
from api.v1.connect.serializers import ConnectionSerializer
from api.v1.houses.serializers import HouseListingDetailSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def connect_house(request, house_id):
    try:
        house = HouseListing.objects.get(id=house_id)
    except HouseListing.DoesNotExist:
        return Response({
            'status_id': status.HTTP_404_NOT_FOUND,
            'error': True,
            'message': "House not found."
        }, status=status.HTTP_404_NOT_FOUND)

    if house.owner == request.user:
        return Response({
            'status_id': status.HTTP_400_BAD_REQUEST,
            'error': True,
            'message': "You cannot connect to your own house as an owner."
        }, status=status.HTTP_400_BAD_REQUEST)
    if Connection.objects.filter(customer=request.user, house=house).exists():
        return Response({
            'status_id': status.HTTP_200_OK,
            'error': False,
            'message': "You are already connected to this house."
        }, status=status.HTTP_200_OK)

    serializer = ConnectionSerializer(data={'house': house_id}, context={'request': request})
    if serializer.is_valid():
        connection = serializer.save()
        return Response({
            'status_id': status.HTTP_201_CREATED,
            'error': False,
            'message': "Connected to house successfully."
        }, status=status.HTTP_201_CREATED)

    return Response({
        'status_id': status.HTTP_400_BAD_REQUEST,
        'error': True,
        'message': "Failed to connect to the house.",
        'data': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)

