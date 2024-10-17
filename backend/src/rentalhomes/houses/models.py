from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator


class HouseListing(models.Model):
    owner = models.ForeignKey('users.CustomUser', on_delete=models.CASCADE, related_name='house_listings')
    featured_image = models.ImageField(upload_to='houses/featured_image/', blank=False)
    location_city = models.ForeignKey("users.Location", on_delete=models.SET_NULL, null=True)
    exact_location = models.CharField(max_length=255, blank=False)
    phone_number = PhoneNumberField(region='IN')
    contact_email = models.EmailField()
    number_of_guests = models.IntegerField(
        help_text="Maximum number of occupants. Must be greater than 0.",
        validators=[
            MinValueValidator(1, message="Number of guests must be at least 1.")
        ]
    )
    rent_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        help_text="Rent amount in INR. Must be greater than or equal to 0.",
        validators=[
            MinValueValidator(0, message="Rent amount cannot be negative.")
        ]
    )
    property_type = models.CharField(
        max_length=255,
        help_text="Enter the type of property (e.g., Apartment, Villa, etc.)."
    )
    number_of_bedrooms = models.IntegerField(
        help_text="Enter the number of bedrooms. Must be greater than or equal to 0.",
        validators=[
            MinValueValidator(0, message="Number of bedrooms cannot be negative.")
        ]
    )
    number_of_bathrooms = models.IntegerField(
        help_text="Enter the number of bathrooms. Must be greater than or equal to 0.",
        validators=[
            MinValueValidator(0, message="Number of bathrooms cannot be negative.")
        ]
    )
    extra_features = models.TextField(blank=True, help_text="Any additional features or descriptions")  
    lease_duration = models.IntegerField(help_text="Lease duration in days", blank=True, null=True)
    parking_available = models.BooleanField(default=False)
    pet_friendly = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        return f"{self.property_type} - {self.location_city}"


class HouseImage(models.Model):
    house = models.ForeignKey("houses.HouseListing", on_delete=models.CASCADE, related_name='gallery_images')
    image = models.ImageField(upload_to='houses/gallery_images/')
    
    def __str__(self):
            return f"Image {self.id} of house {self.house.id}"
    

