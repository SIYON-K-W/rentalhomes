import json

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from houses.models import HouseListing
from users.permissions import IsOwner
from api.v1.tasks.serializers import ConnectionSerializer
from api.v1.houses.serializers import HouseListingDetailSerializer
from api.v1.users.serializers import LocationSerializer
from tasks.models import Connection



@api_view(['GET'])
@permission_classes([IsAuthenticated,IsOwner])
def owner_profile(request):
    owner = request.user
    
    # Fetch owner's details
    owner_data = {
        "first_name": owner.first_name,
        "last_name": owner.last_name,
        "email": owner.email,
        "location": LocationSerializer(owner.location).data if owner.location else None,
    }

    # Fetch houses owned by the owner
    try:
        owned_houses = HouseListing.objects.filter(owner=owner)
    except Exception as e:
        # If something goes wrong during fetching, return an actual error
        return Response({
            'status_id': 500,
            'error': True,
            'message': f"Error fetching houses: {str(e)}",
            'data': {}
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Check if no houses are found, but this is not an "error" just valid empty data
    if not owned_houses.exists():
        return Response({
            'status_id': 200,
            'error': False,
            'message': "No houses found for this owner.",
            'data': {
                "owner_details": owner_data,
                "owned_houses": []
            }
        }, status=status.HTTP_200_OK)

    house_list = []

    # Loop through each house owned by the owner
    for house in owned_houses:
        # Get connected customers for each house
        connected_customers = Connection.objects.filter(house=house).select_related('customer')

        # If no connected customers, add an empty list for connected_customers
        customer_list = [
            {
                "customer_id": connection.customer.id,
                "customer_name": connection.customer.first_name
            }
            for connection in connected_customers
        ] if connected_customers.exists() else []

        # Serialize the house data and append the connected customers
        house_data = HouseListingDetailSerializer(house).data
        house_data['connected_customers'] = customer_list
        house_list.append(house_data)

    # Return success with valid data (including empty lists where applicable)
    response_data = { 
        'status_id': 200,
        'error': False,
        'message': "Owner profile retrieved successfully",
        'data': {
            "owner_details": owner_data,
            "owned_houses": house_list
        }
    }

    return Response(response_data, status=status.HTTP_200_OK)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def customer_profile(request):
    customer = request.user

    # Check if the user is a customer
    if customer.user_type != 'customer':
        return Response({
            'status_id': 403,
            'error': True,
            'message': "Access denied. Only customers can view this profile.",
            'data': {}
        }, status=status.HTTP_403_FORBIDDEN)

    # Fetch customer's details
    customer_data = {
        "first_name": customer.first_name,
        "last_name": customer.last_name,
        "email": customer.email,
        "phone_number": str(customer.phone_number),
        "location": LocationSerializer(customer.location).data if customer.location else None,
    }

    # Fetch houses the customer is connected to
    connected_houses = Connection.objects.filter(customer=customer).select_related('house')

    if not connected_houses.exists():
        return Response({
            'status_id': 200,
            'error': False,
            'message': "No connected houses found for this customer.",
            'data': {
                "customer_details": customer_data,
                "connected_houses": []
            }
        }, status=status.HTTP_200_OK)

    house_list = []
    
    # Loop through each connected house
    for connection in connected_houses:
        house = connection.house
        house_data = HouseListingDetailSerializer(house).data
        house_list.append(house_data)

    # If data is successfully fetched, return the response
    response_data = { 
        'status_id': 200,
        'error': False,
        'message': "Customer profile retrieved successfully",
        'data': {
            "customer_details": customer_data,
            "connected_houses": house_list
        }
    }

    return Response(response_data, status=status.HTTP_200_OK)