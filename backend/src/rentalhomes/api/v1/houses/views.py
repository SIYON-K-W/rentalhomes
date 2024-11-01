from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from houses.models import HouseListing
from auth_user.permissions import IsOwner
from api.v1.houses.serializers import HouseCreateSerializer,HouseListingHomePageSerializer,HouseListingDetailSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def houses(request):
    try:
        house_listings = HouseListing.objects.all()     
        serializer = HouseListingHomePageSerializer(house_listings, many=True,context={"request":request})
        response_data = {
                'status_id': 200,
                'error': False,
                'message': "House listings retrieved successfully",
                'data': serializer.data,
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
@permission_classes([IsAuthenticated])
def house(request, pk):
    try:
        house_listing = HouseListing.objects.get(pk=pk)
    except HouseListing.DoesNotExist:
        return Response({
                'status_id': 404,
                'error': True,
                'message': "House listing not found.",
        }, status=status.HTTP_404_NOT_FOUND)

    serializer = HouseListingDetailSerializer(house_listing, context={"request": request})
    return Response({
            'status_id': 200,
            'error': False,
            'message': "House listing retrieved successfully",
            'data': serializer.data,
    }, status=status.HTTP_200_OK)



@api_view(['POST'])
@permission_classes([IsOwner]) 
def create_house_listing(request):
    serializer = HouseCreateSerializer(data=request.data)
    
    if serializer.is_valid():
        house_listing = serializer.save(owner=request.user)
        
        response_data = {
            'data': {
                'status_id': status.HTTP_201_CREATED,
                'error': False,
                'message': "House listing created successfully",
                'house_listing_id': house_listing.id,
            }
        }
        return Response(response_data, status=status.HTTP_201_CREATED)
    
    error_messages = {}
    non_field_errors = []
    for field, errors in serializer.errors.items():
        if field == "non_field_errors":
            non_field_errors.extend(errors)
        else:
            error_messages[field] = errors

    response_data = {
        'data': {
            'status_id': status.HTTP_400_BAD_REQUEST,
            'error': True,
            'message': error_messages,  
        }
    }
    
    if non_field_errors:
        response_data['data']['non_field_errors'] = non_field_errors
    
    return Response(response_data, status=status.HTTP_400_BAD_REQUEST)