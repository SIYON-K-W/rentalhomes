from django.db import models


class Location(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        db_table = "web_location"

    def __str__(self):
        return f"{self.id}-{self.name}"


