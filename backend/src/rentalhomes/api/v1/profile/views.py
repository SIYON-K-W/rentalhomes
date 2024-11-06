import logging

from django.db import DatabaseError

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from houses.models import HouseListing
from connect.models import Connection
from auth_user.permissions import IsOwner
from api.v1.profile.serializer import CustomerDashboardSerializer, ConnectedHouseSerializer,OwnerProfileSerializer,HouseSummarySerializer,UserLocationSerializer,ConnectedCustomerSerializer

logger = logging.getLogger(__name__)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def customer_dashboard(request):
    customer = request.user

    if customer.user_type != 'customer':
        return Response({
            'status_id': 403,
            'error': True,
            'message': "Access denied. Only customers can view this profile.",
            'data': {}
        }, status=status.HTTP_403_FORBIDDEN)

    try:
        connected_houses = Connection.objects.filter(customer=customer).select_related('house')
        total_connected_houses = connected_houses.count()

        connected_houses_data = [
            ConnectedHouseSerializer(connection.house, context={'request': request}).data 
            for connection in connected_houses
        ]

        user_data = CustomerDashboardSerializer(customer, context={'request': request}).data

        response_data = {
            'status_id': 200,
            'error': False,
            'message': "Customer dashboard data retrieved successfully",
            'data': {
                "user_details": user_data,
                "total_connected_houses": total_connected_houses,
                "connected_houses": connected_houses_data
            }
        }
        return Response(response_data, status=status.HTTP_200_OK)

    except DatabaseError as db_error:
        logger.error(f"Database error: {db_error}")
        return Response({
            'status_id': 500,
            'error': True,
            'message': "An error occurred while accessing the database. Please try again later.",
            'data': {}
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return Response({
            'status_id': 500,
            'error': True,
            'message': "An unexpected error occurred. Please try again later.",
            'data': {}
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['GET'])
@permission_classes([IsAuthenticated, IsOwner])  
def owner_dashboard(request):
    try:
        owner = request.user
        owner_data = OwnerProfileSerializer(owner, context={'request': request}).data
        owned_houses = HouseListing.objects.filter(owner=owner)
        total_owned_houses = owned_houses.count()
        total_connected_customers = Connection.objects.filter(house__in=owned_houses).count()

        owned_houses_data = HouseSummarySerializer(owned_houses, many=True, context={'request': request}).data

        response_data = {
            'status_id': 200,
            'error': False,
            'message': "Owner dashboard data retrieved successfully",
            'data': {
                "user_details": owner_data,
                "total_owned_houses": total_owned_houses,
                "total_connected_customers": total_connected_customers,
                "owned_houses": owned_houses_data
            }
        }
        return Response(response_data, status=status.HTTP_200_OK)

    except DatabaseError as db_error:
        logger.error(f"Database error occurred: {db_error}")
        return Response({
            'status_id': 500,
            'error': True,
            'message': "Database error. Please try again later.",
            'data': {}
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    except AttributeError as attr_error:
        logger.error(f"Attribute error: {attr_error}")
        return Response({
            'status_id': 500,
            'error': True,
            'message': "An error occurred with the requested data. Please check and try again.",
            'data': {}
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return Response({
            'status_id': 500,
            'error': True,
            'message': "An unexpected error occurred. Please try again later.",
            'data': {}
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_connected_customers(request, house_id):
    try:
        house = HouseListing.objects.get(id=house_id)

        if house.owner != request.user:
            return Response({
                'status_id': 403,
                'error': True,
                'message': "Access denied. Only the owner of this house can view connected customers.",
                'data': {}
            }, status=status.HTTP_403_FORBIDDEN)

        connections = Connection.objects.filter(house=house).select_related('customer')

        serializer = ConnectedCustomerSerializer(connections, many=True,context={'request': request})

        response_data = {
            'status_id': 200,
            'error': False,
            'message': "Connected customers retrieved successfully",
            'data': serializer.data
        }

        return Response(response_data, status=status.HTTP_200_OK)

    except HouseListing.DoesNotExist:
        return Response({
            'status_id': 404,
            'error': True,
            'message': "House not found.",
            'data': {}
        }, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        logger.error(f"Unexpected error in get_connected_customers for house_id {house_id}: {e}")
        return Response({
            'status_id': 500,
            'error': True,
            'message': "An unexpected error occurred. Please try again later.",
            'data': {}
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




@api_view(['GET'])
@permission_classes([IsAuthenticated, IsOwner]) 
def get_user_location(request):
    user = request.user

    if user.location is None:
        return Response(
            {
                'status_id': 404,
                'error': True,
                'message': 'No location is assigned to your account.',
                'data': {}
            },
            status=status.HTTP_404_NOT_FOUND  
        )

    serializer = UserLocationSerializer(user)
    
    response_data = {
        'status_id': 200,
        'error': False,
        'message': 'Location data retrieved successfully',
        'data': {
            'location': serializer.data['location']
        }
    }

    return Response(response_data, status=status.HTTP_200_OK)   