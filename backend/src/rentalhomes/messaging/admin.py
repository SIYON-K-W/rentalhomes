from django.contrib import admin
from messaging.models import Conversation, Message

@admin.register(Conversation)
class ConversationAdmin(admin.ModelAdmin):
    list_display = ('id', 'owner', 'customer', 'house_listing', 'created_at')
    search_fields = ('owner__username', 'customer__username', 'house_listing__title')
    list_filter = ('created_at',)

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'conversation', 'sender', 'timestamp', 'is_read')
    search_fields = ('conversation__id', 'sender__username', 'content')
    list_filter = ('is_read', 'timestamp')
    readonly_fields = ('timestamp',)
