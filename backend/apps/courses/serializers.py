from rest_framework import serializers
from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    instructor_name = serializers.CharField(source='instructor.full_name', read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'title', 'slug', 'description', 'instructor', 'instructor_name', 'category', 'status', 'created_at', 'updated_at', 'is_active']
        read_only_fields = ['created_at', 'updated_at']
