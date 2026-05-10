from django.contrib import admin
from .models import Enrollment

@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('student', 'course', 'active', 'completed', 'progress', 'enrolled_at')
    list_filter = ('active', 'completed')
    search_fields = ('student__email', 'course__title')
