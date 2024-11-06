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
        
        response_data = {
            'status_id': 200,
            'error': False,
            'message': "Successfully logged in",
            'data': {
                 'token':{
                    'refresh': serializer.validated_data['refresh'],
                    'access': serializer.validated_data['access'],
                },
                'user_type': serializer.validated_data['user_type'],
                'location_id': serializer.validated_data['location_id'],
            }
        }
        return Response(response_data, status=status.HTTP_200_OK)

    except AuthenticationFailed as errors:
        response_data = {
            'status_id': 400,
            'error': True,
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
            'error': True,
            'message': str(error_data),
        }
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    serializer = SignupSerializer(data=request.data)
    try:
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        response_data = {
            'status_id': 200,
            'error': False,
            'message': "Successfully registered",
            'data': {
                'user_type': user.user_type,
                'location_id': user.location.id if user.location else None,
                'token':{
                   'refresh': str(refresh),
                   'access': str(refresh.access_token),
                }
            },
        }
        return Response(response_data, status=status.HTTP_201_CREATED)

    except serializers.ValidationError as errors:
        error_data = {field: error[0] if isinstance(error, list) else error for field, error in errors.detail.items()}
        response_data = {
            'status_id': 400,
            'error': True,
            'message': error_data,
        }
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
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
        refresh_token = request.data.get('refresh')
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