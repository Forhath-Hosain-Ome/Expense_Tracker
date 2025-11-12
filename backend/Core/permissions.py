from rest_framework import permissions
from django.conf import settings

class CryptoAPIKeyPermission(permissions.BasePermission):
    """
    Allows access only if request contains valid crypto API key in headers.
    """
    def has_permission(self, request, view):
        api_key = request.headers.get('X-API-KEY')
        return api_key == settings.CRYPTO_API_KEY

class IsOwnerOrSharedAccount(permissions.BasePermission):
    """
    Only allows access if user owns the account or has shared access.
    """
    def has_object_permission(self, request, view, obj):
        return request.user == obj.user or request.user in obj.shared_with.all()
