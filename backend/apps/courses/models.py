from django.db import models
from apps.users.models import User

class Course(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('archived', 'Archived'),
    ]

    title = models.CharField(max_length=220)
    slug = models.SlugField(max_length=240, unique=True)
    description = models.TextField(blank=True)
    instructor = models.ForeignKey(User, related_name='courses', on_delete=models.PROTECT, limit_choices_to={'role': User.Role.INSTRUCTOR})
    category = models.CharField(max_length=120, blank=True)
    status = models.CharField(max_length=32, choices=STATUS_CHOICES, default='draft')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [models.Index(fields=['slug']), models.Index(fields=['status'])]

    def __str__(self):
        return self.title
