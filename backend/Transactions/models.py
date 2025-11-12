from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class PaymentMethod(models.Model):
    CASH = 'Cash'
    CARD = 'Card'
    BANK = 'Bank Transfer'
    OTHER = 'Other'
    METHOD_CHOICES = [
        (CASH, 'Cash'),
        (CARD, 'Card'),
        (BANK, 'Bank Transfer'),
        (OTHER, 'Other'),
    ]

    name = models.CharField(max_length=50, choices=METHOD_CHOICES)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payment_methods')

    def __str__(self):
        return self.name