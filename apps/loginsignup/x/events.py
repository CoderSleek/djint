from django.db import models

class Event(models.Model):
    event_name = models.CharField(max_length=200)
    data = models.TextField()
    time = models.DateTimeField()
    location = models.CharField(max_length=200)
    image = models.ImageField(upload_to='event_images/', blank=True, null=True)
    is_liked = models.BooleanField(default=False)
