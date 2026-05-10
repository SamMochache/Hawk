from django.contrib import admin
from .models import LiveClass

@admin.register(LiveClass)
class LiveClassAdmin(admin.ModelAdmin):
    list_display = ('title', 'course', 'instructor', 'is_live', 'start_time')
    list_filter = ('is_live', 'course')
    search_fields = ('title', 'course__title', 'instructor__email')
