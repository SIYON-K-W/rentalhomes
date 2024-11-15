from django.urls import path
from api.v1.messaging import views

urlpatterns = [
    path('conversation/', views.get_or_create_conversation, name='get_or_create_conversation'),  # Create or retrieve a conversation
    path('conversations/', views.get_user_conversations, name='get_user_conversations'),  # Get all user conversations
    path('conversation/<int:conversation_id>/messages/', views.get_messages, name='get_messages'),  # Get messages in a conversation
    path('conversation/<int:conversation_id>/send_message/', views.send_message, name='send_message'),  # Send a message
]
