from django.urls import path
from api.v1.messenger import views

urlpatterns = [
    path('messages/', views.message_list_view),
    path('messages/send/', views.send_message_view),
    path('messages/<int:pk>/', views.message_detail_view),
    path('messages/unread-count/', views.unread_messages_count_view),
    path('messages/history/<int:contact_id>/', views.message_history_view),  
]
