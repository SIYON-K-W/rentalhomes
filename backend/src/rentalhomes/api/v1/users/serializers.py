from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password


from users.models import Location

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
        write_only=True, required=True, validators=[validate_password],
        error_messages={"required": "Password is required."}
    )
    password2 = serializers.CharField(
        write_only=True, required=True, error_messages={"required": "Please confirm your password."}
    )

    phone_number = serializers.CharField(
        required=True, max_length=15,
        validators=[UniqueValidator(queryset=User.objects.all(), message="Phone number already exists.")]
    )

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'phone_number', 'password', 'password2', 'user_type', 'location')

    def validate(self, attrs):
        # Check if passwords match
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Passwords don't match."})
        
        # Ensure phone number is all digits and within a valid length range
        phone_number = attrs.get('phone_number')
        if not phone_number.isdigit():
            raise serializers.ValidationError({"phone_number": "Phone number must contain only digits."})
        if len(phone_number) < 7 or len(phone_number) > 15:
            raise serializers.ValidationError({"phone_number": "Phone number must be between 7 and 15 digits long."})

        # Ensure valid user_type
        user_type = attrs.get('user_type')
        if user_type not in ['owner', 'customer']:
            raise serializers.ValidationError({"user_type": "Invalid user type."})

        # Ensure location is provided for owners only
        if user_type == 'owner' and not attrs.get('location'):
            raise serializers.ValidationError({"location": "Location is required for owners."})
        if user_type == 'customer' and attrs.get('location'):
            raise serializers.ValidationError({"location": "Customers should not have a location."})

        return attrs

    def create(self, validated_data):
        # Remove password2 from validated data
        validated_data.pop('password2')

        # Create the user instance
        user = User.objects.create(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            phone_number=validated_data['phone_number'],
            email=validated_data['email'],
            user_type=validated_data['user_type'],
            location=validated_data.get('location') if validated_data['user_type'] == 'owner' else None
        )
        
        # Set and hash the password
        user.set_password(validated_data['password'])
        user.save()

        return user