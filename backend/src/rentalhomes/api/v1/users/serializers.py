from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password


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

    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = self.user
        return data
    


User = get_user_model()


class SignupSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all(), message="Username already exists.")]
    )
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all(), message="Email already exists.")]
    )
    first_name = serializers.CharField(required=True, max_length=30)
    last_name = serializers.CharField(required=True, max_length=30)
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)

    phone_number = serializers.CharField(
        required=True, max_length=15, validators=[UniqueValidator(queryset=CustomUser.objects.all(), message="Phone number already exists.")]
    )

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email','phone_number', 'password', 'password2', 'user_type', 'location')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Passwords don't match."})
        
        phone_number = attrs.get('phone_number')
        if not phone_number.isdigit():
            raise serializers.ValidationError({"phone_number": "Phone number must contain only digits."})

        return attrs

    def create(self, validated_data):
        validated_data.pop('password2') 
        user = User.objects.create(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            phone_number=validated_data['phone_number'],
            email=validated_data['email'],
            user_type=validated_data['user_type'],
            location=validated_data.get('location') 
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
