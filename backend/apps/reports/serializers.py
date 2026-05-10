from rest_framework import serializers
from .models import Report

class ReportSerializer(serializers.ModelSerializer):
    generated_by_email = serializers.CharField(source='generated_by.email', read_only=True)

    class Meta:
        model = Report
        fields = ['id', 'title', 'report_type', 'generated_by', 'generated_by_email', 'data', 'created_at']
        read_only_fields = ['created_at']
