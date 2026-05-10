from django.contrib import admin
from .models import ProjectSubmission

@admin.register(ProjectSubmission)
class ProjectSubmissionAdmin(admin.ModelAdmin):
    list_display = ('title', 'student', 'course', 'status', 'submitted_at')
    list_filter = ('status', 'course')
    search_fields = ('title', 'student__email', 'course__title')
