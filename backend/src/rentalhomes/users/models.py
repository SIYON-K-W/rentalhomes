from django.contrib.auth.models import AbstractUser
from django.db import models


USER_TYPE_CHOICES = (
        ('owner', 'Owner'),
        ('customer', 'Customer'),
    )


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, blank=True)
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES)
    location = models.ForeignKey('users.Location', null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.username
    

class Location(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        db_table = "users_location"

    def __str__(self):
        return self.name


