from django.db import models
from django.conf import settings

class Message(models.Model):
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='sent_messages',
        on_delete=models.CASCADE
    )
    recipient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='received_messages',
        on_delete=models.CASCADE
    )
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)  # Track read status of each message
    is_deleted = models.BooleanField(default=False)  # Track if the message is deleted by sender or recipient
    attachment = models.FileField(upload_to='message_attachments/', null=True, blank=True)  # Optional attachment field

    class Meta:
        ordering = ['timestamp']
        indexes = [
            models.Index(fields=['timestamp']),  # For quicker retrieval of messages in order
            models.Index(fields=['is_read']),    # For optimized filtering of unread messages
        ]

    def __str__(self):
        return f"Message from {self.sender.username} to {self.recipient.username} at {self.timestamp}"

    def mark_as_read(self):
        """Mark this message as read."""
        self.is_read = True
        self.save(update_fields=['is_read'])

    def soft_delete(self):
        """Mark this message as deleted without removing it from the database."""
        self.is_deleted = True
        self.save(update_fields=['is_deleted'])
