import re

from django.core.exceptions import ValidationError
from rest_framework import serializers

from houses.models import HouseListing,HouseImage



class HouseListingHomePageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HouseListing
        fields = ['id','featured_image', 'formatted_rent_amount', 'special_about_place', 'location_city', 'lease_duration']


class HouseImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HouseImage
        fields = ['id', 'image'] 


class HouseListingDetailSerializer(serializers.ModelSerializer):
    featured_image = serializers.ImageField(required=True)
    gallery_images = HouseImageSerializer(many=True, read_only=True)

    class Meta:
        model = HouseListing
        fields = ['id', 'title', 'sub_title', 'special_about_place', 'featured_image', 
                  'location_city', 'exact_location', 'phone_number', 
                  'contact_email', 'number_of_guests', 'rent_amount', 
                  'property_type', 'number_of_bedrooms', 'number_of_bathrooms', 
                  'extra_features', 'lease_duration', 'parking_available', 
                  'pet_friendly', 'created_at','gallery_images']



class HouseCreateSerializer(serializers.ModelSerializer):
    gallery_images = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=True,
        help_text="Upload multiple images for the house gallery."
    )
    phone_number = serializers.CharField(
        required=True,
        max_length=10,
        help_text="Phone number must be exactly 10 digits."
    )
    featured_image = serializers.ImageField(required=True)
    title = serializers.CharField(min_length=10, help_text="Title must be at least 10 characters long.")
    special_about_place = serializers.CharField(min_length=5, max_length=30)
    contact_email = serializers.EmailField(required=True)
    number_of_guests = serializers.IntegerField(min_value=1, help_text="Must be at least 1.")
    rent_amount = serializers.IntegerField(min_value=10, help_text="Rent amount should be greater than 10 INR.")
    property_type = serializers.CharField(required=True)
    number_of_bedrooms = serializers.IntegerField(min_value=1, help_text="Must be a positive integer.")
    number_of_bathrooms = serializers.IntegerField(min_value=0, help_text="Cannot be negative.")
    lease_duration = serializers.CharField(required=True)
    parking_available = serializers.BooleanField(required=False)
    pet_friendly = serializers.BooleanField(required=False)
    
    class Meta:
        model = HouseListing
        fields = [
            'title', 'sub_title', 'special_about_place', 'featured_image', 
            'location_city', 'exact_location', 'phone_number', 
            'contact_email', 'number_of_guests', 'rent_amount', 
            'property_type', 'number_of_bedrooms', 'number_of_bathrooms', 
            'extra_features', 'lease_duration', 'parking_available', 
            'pet_friendly', 'gallery_images'
        ]

    def create(self, validated_data):
        # Extract gallery images from validated data
        gallery_images_data = validated_data.pop('gallery_images')
        
        # Create the house listing instance
        house_listing = HouseListing.objects.create(**validated_data)

        # Create gallery images for the house listing
        for image in gallery_images_data:
            HouseImage.objects.create(house=house_listing, image=image)

        return house_listing

    def validate(self, attrs):
        # Validate title length
        if len(attrs['title']) < 10:
            raise ValidationError("The title must be at least 10 characters long.")
        
        # Validate special_about_place length
        if len(attrs['special_about_place']) < 5 or len(attrs['special_about_place']) > 30:
            raise ValidationError("The 'special about place' description must be at least 5 characters long and a maximum of 30 characters.")
        
        # Validate rent amount is reasonable
        if attrs['rent_amount'] < 10:
            raise ValidationError("The rent amount should be greater than 10 INR")
        
        # Validate number of guests is at least 1
        if attrs['number_of_guests'] <= 0:
            raise ValidationError("Number of guests must be at least 1.")
        
        # Validate number of bedrooms and bathrooms
        if attrs['number_of_bedrooms'] <= 0:
            raise ValidationError("Number of bedrooms must be a positive integer.")
        
        if attrs['number_of_bathrooms'] < 0:
            raise ValidationError("Number of bathrooms cannot be negative.")
        
        # Validate phone number (for region 'IN')
        phone_number = attrs.get('phone_number')
        if not phone_number.isdigit():
            raise serializers.ValidationError({"phone_number": "Phone number must contain only digits."})

        # Check if the phone number is exactly 10 digits long
        if len(phone_number) != 10:
            raise serializers.ValidationError({"phone_number": "Phone number must be exactly 10 digits long."})

        # Validate contact email
        if not re.match(r'^[^@]+@[^@]+\.[^@]+$', attrs['contact_email']):
            raise ValidationError("Please enter a valid email address.")
        
        return attrs