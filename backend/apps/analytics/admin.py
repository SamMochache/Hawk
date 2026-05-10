from django.contrib import admin
from .models import AnalyticsSnapshot

@admin.register(AnalyticsSnapshot)
class AnalyticsSnapshotAdmin(admin.ModelAdmin):
    list_display = ('course', 'instructor', 'total_students', 'average_score', 'completion_rate', 'generated_at')
    search_fields = ('course__title', 'instructor__email')
