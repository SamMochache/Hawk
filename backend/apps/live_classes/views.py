from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import LiveClass
from .serializers import LiveClassSerializer
from apps.authentication.permissions import RolePermission

class LiveClassViewSet(viewsets.ModelViewSet):
    queryset = LiveClass.objects.select_related('instructor', 'course').all()
    serializer_class = LiveClassSerializer
    permission_classes = [permissions.IsAuthenticated, RolePermission]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['course', 'instructor', 'is_live']
    search_fields = ['title', 'description', 'course__title']
    ordering_fields = ['start_time']
    ordering = ['-start_time']
    required_roles = ['admin', 'instructor', 'student', 'parent']

    def get_queryset(self):
        user = self.request.user
        if user.role == 'instructor':
            return self.queryset.filter(instructor=user)
        if user.role == 'student':
            return self.queryset.filter(course__enrollments__student=user)
        if user.role == 'parent':
            return self.queryset.filter(course__enrollments__student__parent=user)
        return self.queryset
