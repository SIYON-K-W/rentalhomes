from django import forms
from django.contrib import admin
from connect.models import Connection
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
import pytz

User = get_user_model()

class ConnectionForm(forms.ModelForm):
    class Meta:
        model = Connection
        exclude = ['connected_at']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Limit queryset to only customers
        self.fields['customer'].queryset = User.objects.filter(user_type='customer')

    def clean(self):
        cleaned_data = super().clean()
        customer = cleaned_data.get('customer')
        house = cleaned_data.get('house')

        # Validate that the customer is not the owner of the house
        if house and customer:
            if customer == house.owner:
                raise ValidationError("An owner cannot connect to their own house.")

            # Check if a connection already exists
            if Connection.objects.filter(customer=customer, house=house).exists():
                raise ValidationError("This customer is already connected to the selected house.")

        return cleaned_data

class ConnectionAdmin(admin.ModelAdmin):
    form = ConnectionForm
    list_display = ('customer', 'house', 'display_connected_at')
    list_filter = ('customer', 'house') 
    search_fields = ('customer__username', 'house__title') 

    def display_connected_at(self, obj):
        # Convert connected_at to local time
        local_tz = pytz.timezone('Asia/Kolkata')  # Replace with your local timezone
        connected_at_local = obj.connected_at.astimezone(local_tz)
        return connected_at_local.strftime("%d/%m/%Y %I:%M %p")  # Format as needed

    display_connected_at.short_description = 'Connected At'  # Display name in admin

admin.site.register(Connection, ConnectionAdmin)
