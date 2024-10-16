from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


from users.models import Location,CustomUser

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ("id", "name")


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['user_type'] = user.user_type
        token['location'] = user.location.name if user.location else None

        return token