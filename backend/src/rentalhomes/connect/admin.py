from django import forms
from django.contrib import admin
from connect.models import Connection
from django.contrib.auth import get_user_model

User = get_user_model()

class ConnectionForm(forms.ModelForm):
    class Meta:
        model = Connection
        exclude = ['connected_at']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['customer'].queryset = User.objects.all()

class ConnectionAdmin(admin.ModelAdmin):
    form = ConnectionForm
    list_display = ('customer', 'house', 'connected_at')
    list_filter = ('customer', 'house') 
    search_fields = ('customer__username', 'house__title') 

admin.site.register(Connection, ConnectionAdmin)
