from rest_framework.permissions import BasePermission

class RolePermission(BasePermission):
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False

        required_roles = getattr(view, 'required_roles', None)
        if required_roles is None:
            return True

        if request.user.is_superuser:
            return True

        return request.user.role in required_roles
