from django.db import models
from apps.courses.models import Course
from apps.users.models import User

class AnalyticsSnapshot(models.Model):
    course = models.ForeignKey(Course, related_name='analytics_snapshots', on_delete=models.CASCADE)
    instructor = models.ForeignKey(User, related_name='analytics_snapshots', on_delete=models.CASCADE, limit_choices_to={'role': User.Role.INSTRUCTOR})
    total_students = models.PositiveIntegerField(default=0)
    average_score = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    completion_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    generated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-generated_at']
