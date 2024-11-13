from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['user_type'] = user.user_type
        if user.location:
            token['location_id'] = user.location.id
        else:
            token['location_id'] = None
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['user_type'] = self.user.user_type
        data['location_id'] = self.user.location.id if self.user.location else None
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
        required=True, max_length=13,
        validators=[UniqueValidator(queryset=User.objects.all(), message="Phone number already exists.")]
    )
    

    profile_image = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'phone_number', 'password', 'password2', 'user_type', 'location', 'profile_image')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Passwords don't match."})
        
        phone_number = attrs.get('phone_number')
        if not phone_number.startswith('+91'):
             raise serializers.ValidationError({"phone_number": "Phone number must start with '+91'."})
        number_without_prefix = phone_number[3:]
        print(number_without_prefix)
        if not number_without_prefix.isdigit():
            raise serializers.ValidationError({"phone_number": "Phone number must contain only digits."})
        if len(number_without_prefix) != 10:
             raise serializers.ValidationError({"phone_number": "Phone number must be exactly 10 digits."})

    

        user_type = attrs.get('user_type')
        if user_type not in ['owner', 'customer']:
            raise serializers.ValidationError({"user_type": "Invalid user type."})
        if user_type == 'owner' and not attrs.get('location'):
            raise serializers.ValidationError({"location": "Location is required for owners."})
        if user_type == 'customer' and attrs.get('location'):
            raise serializers.ValidationError({"location": "Customers should not have a location."})

        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')

        profile_image = validated_data.pop('profile_image', None)

        user = User.objects.create(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            phone_number=validated_data['phone_number'],
            email=validated_data['email'],
            user_type=validated_data['user_type'],
            location=validated_data.get('location') if validated_data['user_type'] == 'owner' else None
        )
        
        user.set_password(validated_data['password'])

        if profile_image:
            user.profile_image = profile_image

        user.save()

        return user