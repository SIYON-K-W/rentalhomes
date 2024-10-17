from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from houses.models import HouseListing
from api.v1.houses.serializers import HouseListingCreateSerializer,HouseListingSerializer
from users.permissions import IsOwner


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsOwner])
def create_house_listing(request):
    serializer = HouseListingCreateSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save()  
        
        return Response({
            'data': {
                'status_id': 201,
                'error': False,
                'message': "House listing created successfully",
                'data': serializer.data,
            }
        }, status=status.HTTP_201_CREATED)

    return Response({
        'data': {
            'status_id': 400,
            'error': True,
            'message': serializer.errors, 
        }
    }, status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET'])
@permission_classes([AllowAny])  # Allow any user to access this view
def house_listing_list(request):
    """
    Retrieve all house listings.
    """
    house_listings = HouseListing.objects.all()  # Retrieve all house listings
    serializer = HouseListingSerializer(house_listings, many=True,context={'request': request})  # Serialize the data
    return Response(serializer.data, status=status.HTTP_200_OK)  #