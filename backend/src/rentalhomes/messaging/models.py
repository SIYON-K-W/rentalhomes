from django.db import models
from django.conf import settings
from django.utils import timezone

class Conversation(models.Model):
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='owner_conversations'
    )
    customer = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='customer_conversations'
    )
    house_listing = models.ForeignKey('houses.HouseListing', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Conversation between {self.owner.username} and {self.customer.username} for {self.house_listing}"

    def unread_message_count(self, user):
        return self.messages.filter(is_read=False).exclude(sender=user).count()

    def last_message(self):
        return self.messages.order_by('-timestamp').first()


class Message(models.Model):
    conversation = models.ForeignKey(
        'messaging.Conversation', on_delete=models.CASCADE, related_name='messages'
    )
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sent_messages'
    )
    content = models.TextField()
    timestamp = models.DateTimeField(default=timezone.now)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"Message from {self.sender.username} at {self.timestamp}"

    def mark_as_read(self):
        self.is_read = True
        self.save()

    @property
    def is_sender_owner(self):
        return self.sender == self.conversation.owner
