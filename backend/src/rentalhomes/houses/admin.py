from django.contrib import admin
from django.core.exceptions import ValidationError

from houses.models import HouseListing,HouseImage
from auth_user.models import CustomUser


class HouseImageInline(admin.TabularInline):
    model = HouseImage
    extra = 1  


@admin.register(HouseListing)


class HouseListingAdmin(admin.ModelAdmin):
    list_display = ('id','property_type', 'location_city', 'rent_amount', 'number_of_guests', 'created_at', 'owner')
    search_fields = ('property_type', 'exact_location', 'contact_email')
    list_filter = ('location_city', 'rent_amount', 'number_of_guests')
    inlines = [HouseImageInline]  

    def save_model(self, request, obj, form, change):
        if obj.owner and obj.owner.user_type != 'owner':
            raise ValidationError("The selected user is not an owner. You can only assign houses to users with the 'owner' role.")
        super().save_model(request, obj, form, change)

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "owner":
            kwargs["queryset"] = CustomUser.objects.filter(user_type='owner')
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


@admin.register(HouseImage)


class HouseImageAdmin(admin.ModelAdmin):
    list_display = ('house', 'image')
    search_fields = ('house__property_type',) 
