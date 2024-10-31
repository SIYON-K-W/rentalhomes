from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from api.v1.auth_user.serializers import CustomTokenObtainPairSerializer,SignupSerializer



@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    serializer = CustomTokenObtainPairSerializer(data=request.data)
    try:
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)

        response_data ={
            'status_id': 200,
            'error':False,
            'message': "Successfully logged in",
            'data': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            },
            'username': user.username,
            'user_type': user.user_type,
            'location': user.location.name if user.location else None,
        }
        return Response(response_data, status=status.HTTP_200_OK)

    except AuthenticationFailed as errors:
        response_data = {
            'status_id': 400,
            'error':True,
            'message': str(errors),
        }
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
    except Exception as errors:
            error_data = {}
            if hasattr(serializer, 'errors') and serializer.errors:
                for field, error in serializer.errors.items():
                    error_data[field] = str(error[0])
            response_data = {
                'status_id': 400,
                'error':True,
                'message': str(error_data),
            }
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    serializer = SignupSerializer(data=request.data)

    try:
        # Validate the data
        serializer.is_valid(raise_exception=True)
        
        # Save the user and get the instance
        user = serializer.save()

        # Generate JWT tokens for the user
        refresh = RefreshToken.for_user(user)

        # Build the response data
        response_data = {
            'status_id': 200,
            'error': False,
            'message': "Successfully registered",
            'data': {
                'user': serializer.data,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            },
        }
        return Response(response_data, status=status.HTTP_201_CREATED)

    except serializers.ValidationError as errors:
        # Format validation errors for a clearer response
        error_data = {field: error[0] if isinstance(error, list) else error for field, error in errors.detail.items()}
        response_data = {
            'status_id': 400,
            'error': True,
            'message': error_data,
        }
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        # Handle any unexpected exceptions
        response_data = {
            'status_id': 500,
            'error': True,
            'message': str(e),
        }
        return Response(response_data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        # Get the refresh token from the request data
        refresh_token = request.data.get('refresh')
        
        # If refresh token is provided, blacklist it
        if refresh_token:
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response({
                'status_id': 200,
                'error': False,
                'message': 'Successfully logged out.'
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'status_id': 400,
                'error': True,
                'message': 'Refresh token is required for logout.'
            }, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        return Response({
            'status_id': 500,
            'error': True,
            'message': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    