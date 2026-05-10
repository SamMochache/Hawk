from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Notification
from .serializers import NotificationSerializer
from apps.authentication.permissions import RolePermission

class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.select_related('recipient').all()
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated, RolePermission]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['recipient', 'read', 'notification_type']
    search_fields = ['title', 'message']
    ordering_fields = ['created_at']
    ordering = ['-created_at']
    required_roles = ['admin', 'instructor', 'student', 'parent']

    def get_queryset(self):
        user = self.request.user
        return self.queryset.filter(recipient=user)
