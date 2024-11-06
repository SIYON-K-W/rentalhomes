from django.conf import settings
from django.db import models
from django.db.models import UniqueConstraint


class Connection(models.Model):
    customer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        limit_choices_to={'user_type': 'customer'},
        related_name='connections'  
    )
    house = models.ForeignKey(
        'houses.HouseListing',
        on_delete=models.CASCADE,
        related_name='connections' 
    )
    connected_at = models.DateTimeField(auto_now_add=True)  

    class Meta:
        constraints = [
            UniqueConstraint(fields=['customer', 'house'], name='unique_customer_house_connection')
        ]
        verbose_name = "Connection"  
        verbose_name_plural = "Connections" 

    def __str__(self):
        return f"{self.customer.username} connected with {self.house.title}"
