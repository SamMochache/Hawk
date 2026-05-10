from django.contrib import admin
from .models import Grade

@admin.register(Grade)
class GradeAdmin(admin.ModelAdmin):
    list_display = ('project', 'instructor', 'score', 'graded_at')
    search_fields = ('project__title', 'project__student__email', 'instructor__email')
