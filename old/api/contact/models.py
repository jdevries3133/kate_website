from django.db import models


class ContactInquiry(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    message = models.TextField(blank=True)
    notification_sent = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.name} <{self.email}>'
