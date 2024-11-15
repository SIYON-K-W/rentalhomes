from django.utils import timezone
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from auth_user.models import CustomUser
from messaging.models import Conversation, Message
from api.v1.messaging.serializers import ConversationListSerializer, MessageSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_or_create_conversation(request):
    """Retrieve or create a conversation between an owner and a connected customer."""
    owner = request.user
    customer_id = request.data.get('customer_id')
    customer = get_object_or_404(CustomUser, id=customer_id)

    # Verify connection between owner and customer
    if not owner.has_connected(customer):
        return Response({'detail': 'Not connected with this customer.'}, status=status.HTTP_403_FORBIDDEN)

    # Retrieve existing or create new conversation
    conversation = (
        Conversation.objects.filter(participants=owner).filter(participants=customer).first()
        or Conversation.objects.create()
    )
    conversation.participants.add(owner, customer)  # Add participants to conversation

    # Use ConversationListSerializer to include only the other participant
    serializer = ConversationListSerializer(conversation, context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK if conversation.id else status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_conversations(request):
    """Retrieve all conversations for the authenticated user, showing only the other participant."""
    user = request.user
    conversations = Conversation.objects.filter(participants=user)
    serializer = ConversationListSerializer(conversations, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_messages(request, conversation_id):
    """Retrieve messages in a conversation and mark them as read for the recipient."""
    conversation = get_object_or_404(Conversation, id=conversation_id)

    # Check if the user is a participant in the conversation
    if request.user not in conversation.participants.all():
        return Response({'detail': 'Access denied.'}, status=status.HTTP_403_FORBIDDEN)

    # Retrieve messages and mark unread ones as read
    messages = Message.objects.filter(conversation=conversation).order_by('timestamp')
    unread_messages = messages.filter(is_read=False).exclude(sender=request.user)
    unread_messages.update(is_read=True, read_at=timezone.now())

    serializer = MessageSerializer(messages, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_message(request, conversation_id):
    """Send a new message in a conversation."""
    conversation = get_object_or_404(Conversation, id=conversation_id)

    # Ensure the user is a participant in the conversation
    if request.user not in conversation.participants.all():
        return Response({'detail': 'Access denied.'}, status=status.HTTP_403_FORBIDDEN)

    # Serialize and create the message
    data = {
        'conversation': conversation.id,
        'sender': request.user.id,
        'content': request.data.get('content')
    }
    serializer = MessageSerializer(data=data)
    if serializer.is_valid():
        serializer.save(sender=request.user, conversation=conversation)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
