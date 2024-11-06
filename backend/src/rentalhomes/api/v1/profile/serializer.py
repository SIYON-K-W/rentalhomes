import pytz

from rest_framework import serializers

from houses.models import HouseListing
from auth_user.models import CustomUser
from connect.models import Connection


class ConnectedHouseSerializer(serializers.ModelSerializer):
    location_city = serializers.CharField(source='location_city.name')
    featured_image = serializers.SerializerMethodField()

    class Meta:
        model = HouseListing
        fields = ['id', 'featured_image', 'lease_duration', 'rent_amount', 'location_city']

    def get_featured_image(self, obj):
        request = self.context.get('request')
        if obj.featured_image:
            return request.build_absolute_uri(obj.featured_image.url)
        return None


class CustomerDashboardSerializer(serializers.Serializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.EmailField()
    profile_image = serializers.SerializerMethodField()
    
    def get_profile_image(self, obj):
        request = self.context.get('request')
        if obj.profile_image:
            return request.build_absolute_uri(obj.profile_image.url)
        return None



class OwnerProfileSerializer(serializers.ModelSerializer):
    location = serializers.CharField(source='location.name')
    profile_image = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['profile_image', 'first_name', 'last_name', 'email', 'location']

    def get_profile_image(self, obj):
        request = self.context.get('request')
        if obj.profile_image:
            return f"{request.scheme}://{request.get_host()}{obj.profile_image.url}"
        return None
    
class HouseSummarySerializer(serializers.ModelSerializer):
    location_city = serializers.CharField(source='location_city.name')
    featured_image = serializers.SerializerMethodField()

    class Meta:
        model = HouseListing
        fields = ['id', 'featured_image', 'lease_duration', 'rent_amount', 'location_city']

    def get_featured_image(self, obj):
        request = self.context.get('request')
        if obj.featured_image:
            return f"{request.scheme}://{request.get_host()}{obj.featured_image.url}"
        return None



class UserLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['location']  



class ConnectedCustomerSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(source='customer.profile_image', read_only=True)
    first_name = serializers.CharField(source='customer.first_name', read_only=True)
    last_name = serializers.CharField(source='customer.last_name', read_only=True)
    email = serializers.EmailField(source='customer.email', read_only=True)
    phone_number = serializers.CharField(source='customer.phone_number', read_only=True)
    customer_id = serializers.IntegerField(source='customer.id', read_only=True)
    connected_date = serializers.SerializerMethodField()  
    connected_time = serializers.SerializerMethodField()  

    class Meta:
        model = Connection
        fields = ['customer_id', 'profile_image', 'first_name', 'last_name', 'email','phone_number','connected_date', 'connected_time']

    def get_connected_date(self, obj):
        local_tz = pytz.timezone('Asia/Kolkata') 
        connected_at_local = obj.connected_at.astimezone(local_tz)
        return connected_at_local.strftime("%d/%m/%Y")

    def get_connected_time(self, obj):
        local_tz = pytz.timezone('Asia/Kolkata') 
        connected_at_local = obj.connected_at.astimezone(local_tz)
        return connected_at_local.strftime("%I:%M %p")
       