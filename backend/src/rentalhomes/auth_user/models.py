from django.contrib.auth.models import AbstractUser
from django.db import models

from phonenumber_field.modelfields import PhoneNumberField


USER_TYPE_CHOICES = (
    ('owner', 'Owner'),
    ('customer', 'Customer'),
)


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    phone_number = PhoneNumberField(region='IN', blank=True)
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES)
    location = models.ForeignKey('web.Location', null=True, blank=True, on_delete=models.SET_NULL)

    profile_image = models.ImageField(upload_to='users/profile_images/', null=True, blank=True)

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        return self.username




