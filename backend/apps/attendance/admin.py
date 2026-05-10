from django.contrib import admin
from .models import AttendanceRecord

@admin.register(AttendanceRecord)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ('student', 'lesson', 'status', 'recorded_at')
    list_filter = ('status',)
    search_fields = ('student__email', 'lesson__title')
