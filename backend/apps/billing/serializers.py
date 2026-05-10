from rest_framework import serializers
from .models import Invoice

class InvoiceSerializer(serializers.ModelSerializer):
    student_email = serializers.CharField(source='student.email', read_only=True)

    class Meta:
        model = Invoice
        fields = ['id', 'student', 'student_email', 'amount', 'due_date', 'paid', 'status', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']
