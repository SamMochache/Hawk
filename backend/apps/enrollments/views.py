from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Enrollment
from .serializers import EnrollmentSerializer
from apps.authentication.permissions import RolePermission

class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.select_related('student', 'course').all()
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated, RolePermission]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['course', 'student', 'active', 'completed']
    search_fields = ['student__email', 'course__title']
    ordering_fields = ['enrolled_at', 'progress']
    ordering = ['-enrolled_at']
    required_roles = ['admin', 'instructor']

    def get_queryset(self):
        user = self.request.user
        if user.role == 'student':
            return self.queryset.filter(student=user)
        if user.role == 'parent':
            return self.queryset.filter(student__parent=user)
        return self.queryset
