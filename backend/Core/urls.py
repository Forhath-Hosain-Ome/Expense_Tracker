from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    # JWT endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Income / Expense / Transfer
    path('api/incomes/', views.IncomeListCreateAPIView.as_view(), name='income-list-create'),
    path('api/expenses/', views.ExpenseListCreateAPIView.as_view(), name='expense-list-create'),
    path('api/transfers/', views.TransferListCreateAPIView.as_view(), name='transfer-list-create'),

    # Budgets & Recurring
    path('api/budgets/', views.BudgetListCreateAPIView.as_view(), name='budget-list-create'),
    path('api/recurring/', views.RecurringTransactionListCreateAPIView.as_view(), name='recurring-list-create'),
]
