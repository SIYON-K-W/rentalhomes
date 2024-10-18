from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from users.models import Location,CustomUser
from api.v1.users.serializers import LocationSerializer,CustomTokenObtainPairSerializer,SignupSerializer

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


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    serializer = CustomTokenObtainPairSerializer(data=request.data)
    try:
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)

        response_data ={ 'data':{
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
        }}
        return Response(response_data, status=status.HTTP_200_OK)

    except AuthenticationFailed as errors:
        response_data = {"data":{
            'status_id': 400,
            'error':True,
            'message': str(errors),
        }}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
    except Exception as errors:
            error_data = {}
            if hasattr(serializer, 'errors') and serializer.errors:
                for field, error in serializer.errors.items():
                    error_data[field] = str(error[0])
            response_data = {"data":{
                'status_id': 400,
                'error':True,
                'message': str(error_data),
            }}
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    serializer = SignupSerializer(data=request.data)
    try:
        serializer.is_valid(raise_exception=True)
        user=serializer.save()

        refresh = RefreshToken.for_user(user)

        response_data = {
                'status_id': 200,
                'error': False,
                'message': "Successfully registered",
                'data': {
                    'user': serializer.data,
                    'refresh': str(refresh),
                    'access': str(refresh.access_token)
                },
            }
        return Response(response_data, status=status.HTTP_201_CREATED)

    except serializers.ValidationError as errors:
        error_data = {}
        for field, error in errors.detail.items():
            error_data[field] = error[0] if isinstance(error, list) else error
        response_data = {
            'status_id': 400,
            'error': True,
            # 'message': "Validation error",
            'message':  error_data,
            'data': error_data
        }
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        response_data = {
            'status_id': 500,
            'error': True,
            'message': str(e),
        }
        return Response(response_data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

