from rest_framework import viewsets, permissions
from .models import AnalyticsSnapshot
from .serializers import AnalyticsSnapshotSerializer
from apps.authentication.permissions import RolePermission

class AnalyticsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AnalyticsSnapshot.objects.select_related('course', 'instructor').all()
    serializer_class = AnalyticsSnapshotSerializer
    permission_classes = [permissions.IsAuthenticated, RolePermission]
    required_roles = ['admin', 'instructor', 'parent', 'student']

    def get_queryset(self):
        user = self.request.user
        if user.role == 'instructor':
            return self.queryset.filter(instructor=user)
        if user.role == 'student':
            return self.queryset.filter(course__enrollments__student=user)
        if user.role == 'parent':
            return self.queryset.filter(course__enrollments__student__parent=user)
        return self.queryset
