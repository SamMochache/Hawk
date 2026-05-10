from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Grade
from .serializers import GradeSerializer
from apps.authentication.permissions import RolePermission

class GradeViewSet(viewsets.ModelViewSet):
    queryset = Grade.objects.select_related('project', 'instructor').all()
    serializer_class = GradeSerializer
    permission_classes = [permissions.IsAuthenticated, RolePermission]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['instructor', 'project', 'score']
    search_fields = ['project__title', 'project__student__email']
    ordering_fields = ['graded_at', 'score']
    ordering = ['-graded_at']
    required_roles = ['admin', 'instructor']

    def get_queryset(self):
        user = self.request.user
        if user.role == 'student':
            return self.queryset.filter(project__student=user)
        if user.role == 'parent':
            return self.queryset.filter(project__student__parent=user)
        return self.queryset
