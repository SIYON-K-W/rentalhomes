from django.shortcuts import get_object_or_404
from django.db.models import Q

from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from messenger.models import Message
from api.v1.messenger.serializers import MessageSerializer, CreateMessageSerializer

def get_messages(user, contact_id):
    """Helper function to get messages between user and contact."""
    return Message.objects.filter(
        (Q(sender=user) & Q(recipient_id=contact_id)) | 
        (Q(sender_id=contact_id) & Q(recipient=user))
    ).order_by('timestamp')

# Fetch conversation between two users
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def message_list_view(request, contact_id):
    user = request.user
    messages = get_messages(user, contact_id)
    serializer = MessageSerializer(messages, many=True)
    return Response(serializer.data)

# Send a new message
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def send_message_view(request):
    serializer = CreateMessageSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save(sender=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Retrieve or update a specific message (only sender can update)
@api_view(['GET', 'PUT'])
@permission_classes([permissions.IsAuthenticated])
def message_detail_view(request, pk):
    message = get_object_or_404(Message, pk=pk)
    user = request.user

    # Ensure user is either sender or recipient of the message
    if message.sender != user and message.recipient != user:
        return Response({'detail': 'Not allowed'}, status=status.HTTP_403_FORBIDDEN)

    if request.method == 'GET':
        # Mark as read if recipient views the message
        if message.recipient == user and not message.is_read:
            message.is_read = True
            message.save()
        serializer = MessageSerializer(message)
        return Response(serializer.data)

    elif request.method == 'PUT':
        # Only sender can edit the message
        if message.sender != user:
            return Response({'detail': 'Only the sender can edit the message.'}, status=status.HTTP_403_FORBIDDEN)
        serializer = MessageSerializer(message, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get count of unread messages
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def unread_messages_count_view(request):
    count = Message.objects.filter(recipient=request.user, is_read=False).count()
    return Response({'unread_messages_count': count})

# Fetch full message history with a specific contact
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def message_history_view(request, contact_id):
    user = request.user
    messages = get_messages(user, contact_id)
    serializer = MessageSerializer(messages, many=True)
    return Response(serializer.data)
