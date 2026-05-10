from django.db import models
from apps.users.models import User
from apps.courses.models import Course
from apps.lessons.models import Lesson

class ProjectSubmission(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('review', 'Under Review'),
        ('graded', 'Graded'),
        ('revision', 'Needs Revision'),
    ]

    student = models.ForeignKey(User, related_name='project_submissions', on_delete=models.CASCADE, limit_choices_to={'role': User.Role.STUDENT})
    course = models.ForeignKey(Course, related_name='project_submissions', on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, related_name='project_submissions', on_delete=models.SET_NULL, null=True, blank=True)
    title = models.CharField(max_length=220)
    description = models.TextField(blank=True)
    attachment_url = models.URLField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    submitted_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-submitted_at']

    def __str__(self):
        return f"{self.student.email} - {self.title}"
