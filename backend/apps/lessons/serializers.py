from rest_framework import serializers
from .models import Lesson

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'course', 'title', 'description', 'order', 'duration_minutes', 'content', 'video_url', 'is_published', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']
