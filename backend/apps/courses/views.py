from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Course
from .serializers import CourseSerializer
from apps.authentication.permissions import RolePermission

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.filter(is_active=True)
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated, RolePermission]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'category', 'instructor']
    search_fields = ['title', 'description', 'category']
    ordering_fields = ['created_at', 'title']
    ordering = ['-created_at']
    required_roles = ['admin', 'instructor']

    def perform_create(self, serializer):
        serializer.save()
