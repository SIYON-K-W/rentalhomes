from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from auth_user.models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('username', 'email', 'user_type', 'location', 'is_staff')
    search_fields = ('username', 'email')
    
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password', 'first_name', 'last_name', 'phone_number', 'profile_image')}),
        ('Permissions', {'fields': ('user_type', 'location', 'is_staff', 'is_active', 'groups', 'user_permissions')}),
    )

admin.site.register(CustomUser, CustomUserAdmin)
