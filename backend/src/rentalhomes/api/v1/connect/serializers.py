from rest_framework import serializers
from connect.models import Connection


class ConnectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Connection
        fields = ['customer', 'house', 'connected_at']
        read_only_fields = ['connected_at', 'customer'] 

    def create(self, validated_data):
        validated_data['customer'] = self.context['request'].user
        return super().create(validated_data)



