import json
from channels.generic.websocket import AsyncWebsocketConsumer
from messaging.models import Conversation, Message
from django.contrib.auth import get_user_model

User = get_user_model()

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.conversation_id = self.scope['url_route']['kwargs']['conversation_id']
        self.room_group_name = f'chat_{self.conversation_id}'

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']
        sender_id = data['sender_id']

        # Fetch the conversation and sender
        conversation = await self.get_conversation(self.conversation_id)
        sender = await self.get_user(sender_id)

        # Save message to the database
        msg = await self.create_message(conversation, sender, message)

        # Broadcast message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': msg.content,
                'sender_id': msg.sender.id,
                'timestamp': str(msg.timestamp),
            }
        )

    async def chat_message(self, event):
        # Send message to WebSocket
        await self.send(text_data=json.dumps(event))

    @staticmethod
    async def get_conversation(conversation_id):
        return await database_sync_to_async(Conversation.objects.get)(id=conversation_id)

    @staticmethod
    async def get_user(user_id):
        return await database_sync_to_async(User.objects.get)(id=user_id)

    @staticmethod
    async def create_message(conversation, sender, message):
        return await database_sync_to_async(Message.objects.create)(
            conversation=conversation, sender=sender, content=message
        )
