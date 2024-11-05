from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from messenger.models import Message
from api.v1.messenger.serializers import MessageSerializer, CreateMessageSerializer
from django.shortcuts import get_object_or_404

# Message List View
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def message_list_view(request):
    user = request.user
    messages = Message.objects.filter(recipient=user).order_by('-timestamp')  # Newest messages first
    serializer = MessageSerializer(messages, many=True)
    return Response(serializer.data)

# Send Message View
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def send_message_view(request):
    serializer = CreateMessageSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save(sender=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Message Detail View
@api_view(['GET', 'PUT'])
@permission_classes([permissions.IsAuthenticated])
def message_detail_view(request, pk):
    message = get_object_or_404(Message, pk=pk)
    # Mark the message as read if the recipient views it
    if request.method == 'GET':
        if message.recipient == request.user and not message.is_read:
            message.is_read = True
            message.save()
        serializer = MessageSerializer(message)
        return Response(serializer.data)
    
    # Update message content if sender wants to edit (optional)
    elif request.method == 'PUT' and message.sender == request.user:
        serializer = MessageSerializer(message, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'detail': 'Not allowed'}, status=status.HTTP_403_FORBIDDEN)

# Unread Messages Count View
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def unread_messages_count_view(request):
    count = Message.objects.filter(recipient=request.user, is_read=False).count()
    return Response({'unread_messages_count': count})
