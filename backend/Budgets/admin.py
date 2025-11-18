from django.contrib import admin

# Register your models here.
from .models import Income, Expense, Transfer, RecurringTransaction, Budget

admin.site.register(Income)
admin.site.register(Expense)
admin.site.register(Transfer)
admin.site.register(RecurringTransaction)
admin.site.register(Budget)