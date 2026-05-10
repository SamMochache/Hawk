from django.db import models
from apps.users.models import User
from apps.courses.models import Course

class LiveClass(models.Model):
    instructor = models.ForeignKey(User, related_name='live_classes', on_delete=models.PROTECT, limit_choices_to={'role': User.Role.INSTRUCTOR})
    course = models.ForeignKey(Course, related_name='live_classes', on_delete=models.CASCADE)
    title = models.CharField(max_length=220)
    description = models.TextField(blank=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    is_live = models.BooleanField(default=False)
    meeting_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-start_time']

    def __str__(self):
        return f"{self.title} ({self.course.title})"
