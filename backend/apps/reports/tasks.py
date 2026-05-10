from celery import shared_task
from .models import Report
from django.utils import timezone

@shared_task
def generate_report(title, report_type, generated_by_id, data):
    report = Report.objects.create(
        title=title,
        report_type=report_type,
        generated_by_id=generated_by_id,
        data=data,
    )
    return report.id
