from django.db import models
from apps.users.models import User
from apps.lessons.models import Lesson

class AttendanceRecord(models.Model):
    STATUS_CHOICES = [
        ('present', 'Present'),
        ('absent', 'Absent'),
        ('late', 'Late'),
    ]

    student = models.ForeignKey(User, related_name='attendance_records', on_delete=models.CASCADE, limit_choices_to={'role': User.Role.STUDENT})
    lesson = models.ForeignKey(Lesson, related_name='attendance_records', on_delete=models.CASCADE)
    status = models.CharField(max_length=16, choices=STATUS_CHOICES, default='present')
    recorded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = [['student', 'lesson']]
        ordering = ['-recorded_at']

    def __str__(self):
        return f"{self.student.email}: {self.lesson.title} - {self.status}"
