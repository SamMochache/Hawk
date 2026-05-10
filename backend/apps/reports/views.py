from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Report
from .serializers import ReportSerializer
from apps.authentication.permissions import RolePermission

class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.select_related('generated_by').all()
    serializer_class = ReportSerializer
    permission_classes = [permissions.IsAuthenticated, RolePermission]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['report_type', 'generated_by']
    search_fields = ['title']
    ordering_fields = ['created_at']
    ordering = ['-created_at']
    required_roles = ['admin', 'instructor', 'parent']

    def get_queryset(self):
        user = self.request.user
        if user.role == 'parent':
            return self.queryset.filter(generated_by=user)
        if user.role == 'admin':
            return self.queryset
        return self.queryset
