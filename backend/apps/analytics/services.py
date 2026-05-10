from typing import Dict
from apps.analytics.models import AnalyticsSnapshot


def build_course_summary(course, instructor) -> Dict[str, object]:
    snapshot = AnalyticsSnapshot.objects.filter(course=course, instructor=instructor).order_by('-generated_at').first()
    return {
        'course': course.title,
        'instructor': instructor.full_name,
        'latest_snapshot': snapshot and {
            'total_students': snapshot.total_students,
            'average_score': float(snapshot.average_score),
            'completion_rate': float(snapshot.completion_rate),
            'generated_at': snapshot.generated_at,
        } or None,
    }
