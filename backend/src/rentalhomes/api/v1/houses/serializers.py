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
        fields = ['id', 'image']  # Include both the ID and the image field


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
        write_only=True,  # Required for creating, but not for reading
        required=True,    # Ensure this is required in the form submission
        help_text="Upload multiple images for the house gallery."
    )
    
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
        if len(attrs['special_about_place']) < 5:
            raise ValidationError("The 'special about place' description must be at least 10 characters long.")
        
        # Validate rent amount is reasonable
        if attrs['rent_amount'] < 1000 or attrs['rent_amount'] > 1000000:
            raise ValidationError("The rent amount should be between 1,000 INR and 1,000,000 INR.")
        
        # Validate number of guests is at least 1
        if attrs['number_of_guests'] <= 0:
            raise ValidationError("Number of guests must be at least 1.")
        
        # Validate number of bedrooms and bathrooms
        if attrs['number_of_bedrooms'] <= 0:
            raise ValidationError("Number of bedrooms must be a positive integer.")
        
        if attrs['number_of_bathrooms'] < 0:
            raise ValidationError("Number of bathrooms cannot be negative.")
        
        # Validate phone number (for region 'IN')
        if not re.match(r'^\+91\d{10}$', str(attrs['phone_number'])):
            raise ValidationError("The phone number must be a valid 10-digit number starting with '+91'.")

        # Validate contact email
        if not re.match(r'^[^@]+@[^@]+\.[^@]+$', attrs['contact_email']):
            raise ValidationError("Please enter a valid email address.")
        
        return attrs