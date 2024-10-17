from rest_framework import serializers
from houses.models import HouseListing, HouseImage

class HouseImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HouseImage
        fields = ['id','image']

class HouseListingCreateSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())
    gallery_images = serializers.ListField(
        child=serializers.FileField(), 
        write_only=True, 
        required=False
    )  # Accepts a list of files for gallery images

    class Meta:
        model = HouseListing
        fields = [
            'id', 'owner', 'featured_image', 'location_city', 'exact_location', 
            'phone_number', 'contact_email', 'number_of_guests', 'rent_amount', 
            'property_type', 'number_of_bedrooms', 'number_of_bathrooms', 
            'extra_features', 'lease_duration', 'parking_available', 
            'pet_friendly', 'created_at', 'gallery_images'  # Include gallery_images
        ]
        read_only_fields = ['id', 'owner', 'created_at']  # Add owner and created_at as read-only

    def create(self, validated_data):
        # Extract gallery images data
        gallery_images_data = validated_data.pop('gallery_images', [])
        
        # Create the house listing instance
        house_listing = HouseListing.objects.create(**validated_data)

        # Create gallery images and associate them with the house listing
        for image in gallery_images_data:
            HouseImage.objects.create(house=house_listing, image=image)

        return house_listing




class HouseListingSerializer(serializers.ModelSerializer):
    gallery_images = HouseImageSerializer(many=True, read_only=True)  # Include gallery images

    class Meta:
        model = HouseListing
        fields = [
            'id', 'owner', 'featured_image', 'location_city', 'exact_location',
            'phone_number', 'contact_email', 'number_of_guests', 'rent_amount',
            'property_type', 'number_of_bedrooms', 'number_of_bathrooms',
            'extra_features', 'lease_duration', 'parking_available',
            'pet_friendly', 'created_at', 'gallery_images'
        ]
        read_only_fields = ['owner', 'created_at'] 
