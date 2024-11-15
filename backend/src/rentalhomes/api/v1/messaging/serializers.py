from rest_framework import serializers
from auth_user.models import CustomUser 
from messaging.models import Conversation, Message


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'last_name', 'profile_image']


class ConversationListSerializer(serializers.ModelSerializer):
    other_participant = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = ['id', 'other_participant', 'created_at']

    def get_other_participant(self, conversation):
        request_user = self.context['request'].user
        other_user = conversation.participants.exclude(id=request_user.id).first()
        return UserSerializer(other_user).data if other_user else None


class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'conversation', 'sender', 'content', 'timestamp', 'is_read']
