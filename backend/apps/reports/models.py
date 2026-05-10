from django.db import models
from apps.users.models import User

class Report(models.Model):
    REPORT_TYPES = [
        ('progress', 'Progress'),
        ('attendance', 'Attendance'),
        ('billing', 'Billing'),
    ]

    title = models.CharField(max_length=220)
    report_type = models.CharField(max_length=32, choices=REPORT_TYPES)
    generated_by = models.ForeignKey(User, related_name='reports', on_delete=models.SET_NULL, null=True)
    data = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title
