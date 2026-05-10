from rest_framework import serializers
from .models import ProjectSubmission

class ProjectSubmissionSerializer(serializers.ModelSerializer):
    student_email = serializers.CharField(source='student.email', read_only=True)
    course_title = serializers.CharField(source='course.title', read_only=True)
    lesson_title = serializers.CharField(source='lesson.title', read_only=True)

    class Meta:
        model = ProjectSubmission
        fields = ['id', 'student', 'student_email', 'course', 'course_title', 'lesson', 'lesson_title', 'title', 'description', 'attachment_url', 'status', 'submitted_at', 'updated_at']
        read_only_fields = ['submitted_at', 'updated_at']
