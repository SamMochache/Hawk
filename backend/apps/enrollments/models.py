from django.db import models
from apps.users.models import User
from apps.courses.models import Course

class Enrollment(models.Model):
    student = models.ForeignKey(User, related_name='enrollments', on_delete=models.CASCADE, limit_choices_to={'role': User.Role.STUDENT})
    course = models.ForeignKey(Course, related_name='enrollments', on_delete=models.CASCADE)
    enrolled_at = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=True)
    progress = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    completed = models.BooleanField(default=False)

    class Meta:
        unique_together = [['student', 'course']]
        ordering = ['-enrolled_at']

    def __str__(self):
        return f"{self.student.email} - {self.course.title}"
