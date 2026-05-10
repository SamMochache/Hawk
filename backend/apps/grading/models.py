from django.db import models
from apps.users.models import User
from apps.projects.models import ProjectSubmission

class Grade(models.Model):
    project = models.OneToOneField(ProjectSubmission, related_name='grade', on_delete=models.CASCADE)
    instructor = models.ForeignKey(User, related_name='grades', on_delete=models.PROTECT, limit_choices_to={'role': User.Role.INSTRUCTOR})
    score = models.DecimalField(max_digits=5, decimal_places=2)
    feedback = models.TextField(blank=True)
    graded_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-graded_at']

    def __str__(self):
        return f"{self.project.title} - {self.score}"
