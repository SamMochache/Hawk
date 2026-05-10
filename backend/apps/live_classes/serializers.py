from rest_framework import serializers
from .models import LiveClass

class LiveClassSerializer(serializers.ModelSerializer):
    instructor_name = serializers.CharField(source='instructor.full_name', read_only=True)
    course_title = serializers.CharField(source='course.title', read_only=True)

    class Meta:
        model = LiveClass
        fields = ['id', 'instructor', 'instructor_name', 'course', 'course_title', 'title', 'description', 'start_time', 'end_time', 'is_live', 'meeting_url', 'created_at']
        read_only_fields = ['created_at']
