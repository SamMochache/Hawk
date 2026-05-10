from django.contrib import admin
from .models import Course

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'instructor', 'status', 'category', 'created_at')
    list_filter = ('status', 'category')
    search_fields = ('title', 'description', 'instructor__email')
