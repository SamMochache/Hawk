from rest_framework import serializers
from .models import Grade

class GradeSerializer(serializers.ModelSerializer):
    student = serializers.CharField(source='project.student.email', read_only=True)
    project_title = serializers.CharField(source='project.title', read_only=True)

    class Meta:
        model = Grade
        fields = ['id', 'project', 'project_title', 'student', 'instructor', 'score', 'feedback', 'graded_at']
        read_only_fields = ['graded_at']
