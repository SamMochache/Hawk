from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import ProjectSubmission
from .serializers import ProjectSubmissionSerializer
from apps.authentication.permissions import RolePermission

class ProjectSubmissionViewSet(viewsets.ModelViewSet):
    queryset = ProjectSubmission.objects.select_related('student', 'course', 'lesson').all()
    serializer_class = ProjectSubmissionSerializer
    permission_classes = [permissions.IsAuthenticated, RolePermission]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'course', 'student']
    search_fields = ['title', 'description', 'student__email', 'course__title']
    ordering_fields = ['submitted_at', 'updated_at']
    ordering = ['-submitted_at']
    required_roles = ['admin', 'instructor', 'student']

    def get_queryset(self):
        user = self.request.user
        if user.role == 'student':
            return self.queryset.filter(student=user)
        if user.role == 'parent':
            return self.queryset.filter(student__parent=user)
        return self.queryset
