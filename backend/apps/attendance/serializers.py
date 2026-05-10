from rest_framework import serializers
from .models import AttendanceRecord

class AttendanceSerializer(serializers.ModelSerializer):
    student_email = serializers.CharField(source='student.email', read_only=True)
    lesson_title = serializers.CharField(source='lesson.title', read_only=True)

    class Meta:
        model = AttendanceRecord
        fields = ['id', 'student', 'student_email', 'lesson', 'lesson_title', 'status', 'recorded_at']
        read_only_fields = ['recorded_at']
