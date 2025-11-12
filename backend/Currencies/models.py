from django.db import models

# Create your models here.
class Currency(models.Model):
    code = models.CharField(max_length=5, unique=True)  # USD, EUR
    name = models.CharField(max_length=50)
    symbol = models.CharField(max_length=5)

    def __str__(self):
        return f"{self.code} ({self.symbol})"