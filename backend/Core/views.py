from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from Budgets.models import Income, Expense, Transfer, Budget, RecurringTransaction
from .serializers import IncomeSerializer, ExpenseSerializer, TransferSerializer, BudgetSerializer, RecurringTransactionSerializer
from .permissions import CryptoAPIKeyPermission, IsOwnerOrSharedAccount

# ----------------- Income -----------------
class IncomeListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = IncomeSerializer
    permission_classes = [IsAuthenticated, CryptoAPIKeyPermission]

    def get_queryset(self):
        return Income.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# ----------------- Expense -----------------
class ExpenseListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated, CryptoAPIKeyPermission]

    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# ----------------- Transfer -----------------
class TransferListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = TransferSerializer
    permission_classes = [IsAuthenticated, CryptoAPIKeyPermission]

    def get_queryset(self):
        return Transfer.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# ----------------- Budget -----------------
class BudgetListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated, CryptoAPIKeyPermission]

    def get_queryset(self):
        return Budget.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# ----------------- Recurring Transaction -----------------
class RecurringTransactionListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = RecurringTransactionSerializer
    permission_classes = [IsAuthenticated, CryptoAPIKeyPermission]

    def get_queryset(self):
        return RecurringTransaction.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
