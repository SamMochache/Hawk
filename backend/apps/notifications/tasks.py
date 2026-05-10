from celery import shared_task
from django.utils import timezone
from .models import Notification

@shared_task
def send_notification(recipient_id, title, message, notification_type='info'):
    Notification.objects.create(
        recipient_id=recipient_id,
        title=title,
        message=message,
        notification_type=notification_type,
    )

@shared_task
def mark_notification_read(notification_id):
    Notification.objects.filter(id=notification_id).update(read=True)
