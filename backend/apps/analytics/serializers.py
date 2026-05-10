from rest_framework import serializers
from .models import AnalyticsSnapshot

class AnalyticsSnapshotSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source='course.title', read_only=True)
    instructor_name = serializers.CharField(source='instructor.full_name', read_only=True)

    class Meta:
        model = AnalyticsSnapshot
        fields = ['id', 'course', 'course_title', 'instructor', 'instructor_name', 'total_students', 'average_score', 'completion_rate', 'generated_at']
        read_only_fields = ['generated_at']
