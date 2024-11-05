from django.contrib import admin
from messenger.models import Message

class MessageAdmin(admin.ModelAdmin):
    list_display = ('sender', 'recipient', 'timestamp', 'is_read', 'content_excerpt')
    list_filter = ('is_read', 'timestamp')
    search_fields = ('sender__username', 'recipient__username', 'content')
    readonly_fields = ('timestamp',)  # Timestamp should be read-only

    def content_excerpt(self, obj):
        # Show a short preview of the content for easier admin viewing
        return obj.content[:50] + '...' if len(obj.content) > 50 else obj.content
    content_excerpt.short_description = 'Message Content'

admin.site.register(Message, MessageAdmin)
