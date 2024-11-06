from django.contrib.auth import get_user_model
from rest_framework import serializers
from messenger.models import Message

User = get_user_model()

class MessageSerializer(serializers.ModelSerializer):
    sender_username = serializers.CharField(source='sender.username', read_only=True)
    recipient_username = serializers.CharField(source='recipient.username', read_only=True)
    summary = serializers.SerializerMethodField()
    formatted_timestamp = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = [
            'id', 'sender', 'sender_username', 'recipient', 'recipient_username',
            'content', 'summary', 'timestamp', 'formatted_timestamp', 'is_read'
        ]
        read_only_fields = ['id', 'timestamp', 'sender', 'is_read']

    def get_summary(self, obj):
        summary_length = 30  # You can adjust this length as needed
        return obj.content[:summary_length] + '...' if len(obj.content) > summary_length else obj.content

    def get_formatted_timestamp(self, obj):
        return obj.timestamp.strftime('%Y-%m-%d %H:%M:%S')


class CreateMessageSerializer(serializers.ModelSerializer):
    recipient_username = serializers.CharField(source='recipient.username', read_only=True)

    class Meta:
        model = Message
        fields = ['recipient', 'recipient_username', 'content']

    def validate_recipient(self, value):
        user = self.context['request'].user
        if not User.objects.filter(id=value.id).exists():
            raise serializers.ValidationError("Recipient does not exist.")
        if user == value:
            raise serializers.ValidationError("You cannot send a message to yourself.")
        return value

    def create(self, validated_data):
        # Automatically set the sender to the current authenticated user
        validated_data['sender'] = self.context['request'].user
        return super().create(validated_data)
