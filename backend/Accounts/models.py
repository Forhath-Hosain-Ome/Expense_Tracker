from django.db import models
from django.contrib.auth.models import User
from Currencies.models import Currency

# Create your models here.
class Account(models.Model):
    name = models.CharField(max_length=100)
    balance = models.DecimalField(max_digits=15, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='accounts')
    currency = models.ForeignKey(Currency, on_delete=models.SET_NULL, null=True)
    shared_with = models.ManyToManyField(User, related_name='shared_accounts', blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.currency})"