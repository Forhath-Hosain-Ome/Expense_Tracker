from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Category(models.Model):
    INCOME = 'IN'
    EXPENSE = 'EX'
    CATEGORY_TYPES = [
        (INCOME, 'Income'),
        (EXPENSE, 'Expense'),
    ]

    name = models.CharField(max_length=50)
    type = models.CharField(max_length=2, choices=CATEGORY_TYPES)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='categories')
    
    def __str__(self) -> str:
        return f"{self.name} ({self.type})"