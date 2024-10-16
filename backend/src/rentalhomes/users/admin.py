from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from users.models import CustomUser, Location

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('username', 'email', 'user_type', 'location', 'is_staff')
    search_fields = ('username', 'email')
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password', 'first_name', 'last_name', 'phone_number')}),
        ('Permissions', {'fields': ('user_type', 'location', 'is_staff', 'is_active', 'groups', 'user_permissions')}),
    )

admin.site.register(CustomUser, CustomUserAdmin)

admin.site.register(Location)
