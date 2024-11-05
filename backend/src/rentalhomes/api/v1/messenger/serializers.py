from rest_framework import serializers
from messenger.models import Message
from django.contrib.auth import get_user_model

User = get_user_model()

class MessageSerializer(serializers.ModelSerializer):
    sender_username = serializers.CharField(source='sender.username', read_only=True)
    recipient_username = serializers.CharField(source='recipient.username', read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'sender', 'sender_username', 'recipient', 'recipient_username', 'content', 'timestamp', 'is_read']
        read_only_fields = ['id', 'timestamp', 'sender', 'is_read']

class CreateMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['recipient', 'content']

    def validate_recipient(self, value):
        # Ensure the recipient is a valid user
        if not User.objects.filter(id=value.id).exists():
            raise serializers.ValidationError("Recipient does not exist.")
        return value

    def create(self, validated_data):
        # Automatically set the sender to the logged-in user
        validated_data['sender'] = self.context['request'].user
        return super().create(validated_data)
