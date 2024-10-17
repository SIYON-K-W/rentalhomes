from django.contrib import admin
from .models import HouseListing, HouseImage

class HouseImageInline(admin.TabularInline):
    model = HouseImage
    extra = 1  

@admin.register(HouseListing)
class HouseListingAdmin(admin.ModelAdmin):
    list_display = ('property_type', 'location_city', 'rent_amount', 'number_of_guests', 'created_at')
    search_fields = ('property_type', 'exact_location', 'contact_email')
    list_filter = ('location_city', 'rent_amount', 'number_of_guests')
    inlines = [HouseImageInline]  

@admin.register(HouseImage)
class HouseImageAdmin(admin.ModelAdmin):
    list_display = ('house', 'image')
    search_fields = ('house__property_type',) 

