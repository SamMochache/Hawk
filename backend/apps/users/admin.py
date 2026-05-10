from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'last_name', 'role', 'is_staff', 'is_active')
    list_filter = ('role', 'is_staff', 'is_active')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)
    fields = ('email', 'first_name', 'last_name', 'role', 'parent', 'is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')
    readonly_fields = ('date_joined',)
