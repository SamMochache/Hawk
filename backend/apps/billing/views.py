from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Invoice
from .serializers import InvoiceSerializer
from apps.authentication.permissions import RolePermission

class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.select_related('student').all()
    serializer_class = InvoiceSerializer
    permission_classes = [permissions.IsAuthenticated, RolePermission]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'paid', 'student']
    search_fields = ['student__email']
    ordering_fields = ['due_date', 'amount']
    ordering = ['-due_date']
    required_roles = ['admin', 'student', 'parent']

    def get_queryset(self):
        user = self.request.user
        if user.role == 'student':
            return self.queryset.filter(student=user)
        if user.role == 'parent':
            return self.queryset.filter(student__parent=user)
        return self.queryset
