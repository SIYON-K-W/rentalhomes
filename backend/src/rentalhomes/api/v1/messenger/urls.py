from django.urls import path
from api.v1.messenger import views

urlpatterns = [
    path('messages/', views.message_list_view, name='message-list'),
    path('messages/send/', views.send_message_view, name='send-message'),
    path('messages/<int:pk>/', views.message_detail_view, name='message-detail'),
    path('messages/unread-count/', views.unread_messages_count_view, name='unread-messages-count'),
]
