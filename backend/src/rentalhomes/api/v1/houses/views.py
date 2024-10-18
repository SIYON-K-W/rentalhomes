from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

from houses.models import HouseListing
from users.permissions import IsOwner
from api.v1.houses.serializers import HouseImageSerializer,HouseCreateSerializer,HouseListingHomePageSerializer,HouseListingDetailSerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def houses(request):
    try:
        house_listings = HouseListing.objects.all()     
        serializer = HouseListingHomePageSerializer(house_listings, many=True,context={"request":request})
        response_data = {
            'data': {
                'status_id': 200,
                'error': False,
                'message': "House listings retrieved successfully",
                'data': serializer.data,
            }
        }
        return Response(response_data, status=status.HTTP_200_OK)
    except Exception as e:
        response_data = {
            'data': {
                'status_id': 500,
                'error': True,
                'message': str(e),  
            }
        }
        return Response(response_data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['GET'])
@permission_classes([AllowAny])
def house(request, pk):
    try:
        house_listing = HouseListing.objects.get(pk=pk)
    except HouseListing.DoesNotExist:
        return Response({
            'data': {
                'status_id': 404,
                'error': True,
                'message': "House listing not found.",
            }
        }, status=status.HTTP_404_NOT_FOUND)

    serializer = HouseListingDetailSerializer(house_listing, context={"request": request})
    return Response({
        'data': {
            'status_id': 200,
            'error': False,
            'message': "House listing retrieved successfully",
            'data': serializer.data,
        }
    }, status=status.HTTP_200_OK)



@api_view(['POST'])
@permission_classes([IsOwner])  # Ensure only owners can create listings
def create_house_listing(request):
    # Pass the data to the serializer
    serializer = HouseCreateSerializer(data=request.data)
    
    if serializer.is_valid():
        # Save the house listing, automatically associating the logged-in user as the owner
        house_listing = serializer.save(owner=request.user)
        
        response_data = {
            'data': {
                'status_id': 201,
                'error': False,
                'message': "House listing created successfully",
                'house_listing_id': house_listing.id,  # Return the ID of the created listing
            }
        }
        return Response(response_data, status=status.HTTP_201_CREATED)
    
    # If the serializer is not valid, return the validation errors
    response_data = {
        'data': {
            'status_id': 400,
            'error': True,
            'message': serializer.errors, 
        }
    }
    return Response(response_data, status=status.HTTP_400_BAD_REQUEST)