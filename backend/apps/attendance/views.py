from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import AttendanceRecord
from .serializers import AttendanceSerializer
from apps.authentication.permissions import RolePermission

class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = AttendanceRecord.objects.select_related('student', 'lesson').all()
    serializer_class = AttendanceSerializer
    permission_classes = [permissions.IsAuthenticated, RolePermission]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'lesson', 'student']
    search_fields = ['student__email', 'lesson__title']
    ordering_fields = ['recorded_at']
    ordering = ['-recorded_at']
    required_roles = ['admin', 'instructor']

    def get_queryset(self):
        user = self.request.user
        if user.role == 'student':
            return self.queryset.filter(student=user)
        if user.role == 'parent':
            return self.queryset.filter(student__parent=user)
        return self.queryset
