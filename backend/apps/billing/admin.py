from django.contrib import admin
from .models import Invoice

@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ('student', 'amount', 'status', 'paid', 'due_date')
    list_filter = ('status', 'paid')
    search_fields = ('student__email',)
