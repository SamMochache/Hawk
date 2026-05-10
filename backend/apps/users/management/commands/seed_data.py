from django.core.management.base import BaseCommand
from django.utils import timezone
from apps.users.models import User
from apps.courses.models import Course
from apps.lessons.models import Lesson
from apps.enrollments.models import Enrollment
from apps.attendance.models import AttendanceRecord
from apps.projects.models import ProjectSubmission
from apps.grading.models import Grade
from apps.notifications.models import Notification
from apps.billing.models import Invoice
from apps.reports.models import Report
from apps.live_classes.models import LiveClass

class Command(BaseCommand):
    help = 'Seeds initial demo data for Tinkacode backend.'

    def handle(self, *args, **options):
        self.stdout.write('Seeding initial data...')

        admin, _ = User.objects.get_or_create(
            email='admin@tinkacode.com',
            defaults={
                'first_name': 'Admin',
                'last_name': 'Tinkacode',
                'role': User.Role.ADMIN,
                'is_staff': True,
                'is_superuser': True,
                'is_active': True,
            }
        )
        if admin.has_usable_password() is False:
            admin.set_password('AdminPass123!')
            admin.save()

        instructor, _ = User.objects.get_or_create(
            email='instructor@tinkacode.com',
            defaults={
                'first_name': 'Sarah',
                'last_name': 'Johnson',
                'role': User.Role.INSTRUCTOR,
                'is_active': True,
            }
        )
        if not instructor.has_usable_password():
            instructor.set_password('Instructor123!')
            instructor.save()

        parent, _ = User.objects.get_or_create(
            email='parent@tinkacode.com',
            defaults={
                'first_name': 'Grace',
                'last_name': 'Otieno',
                'role': User.Role.PARENT,
                'is_active': True,
            }
        )
        if not parent.has_usable_password():
            parent.set_password('Parent123!')
            parent.save()

        student, _ = User.objects.get_or_create(
            email='student@tinkacode.com',
            defaults={
                'first_name': 'Brian',
                'last_name': 'Otieno',
                'role': User.Role.STUDENT,
                'parent': parent,
                'is_active': True,
            }
        )
        if not student.has_usable_password():
            student.set_password('Student123!')
            student.save()

        courses = []
        course_data = [
            ('Intro to Python', 'intro-to-python', 'Coding fundamentals for junior learners.'),
            ('Robotics Basics', 'robotics-basics', 'Hands-on robotics and circuits.'),
        ]
        for title, slug, desc in course_data:
            course, _ = Course.objects.get_or_create(
                slug=slug,
                defaults={
                    'title': title,
                    'description': desc,
                    'instructor': instructor,
                    'category': 'STEM',
                    'status': 'published',
                    'is_active': True,
                }
            )
            courses.append(course)

        lessons = []
        lesson_data = [
            (courses[0], 'Variables and Data Types', 1, 25, 'Learn how variables work.'),
            (courses[0], 'Control Flow', 2, 30, 'If statements, loops, and logic.'),
            (courses[1], 'Circuit Basics', 1, 35, 'Foundations of robotics circuits.'),
            (courses[1], 'Motors and Sensors', 2, 40, 'Connect motors and read sensors.'),
        ]
        for course, title, order, duration, desc in lesson_data:
            lesson, _ = Lesson.objects.get_or_create(
                course=course,
                order=order,
                defaults={
                    'title': title,
                    'description': desc,
                    'duration_minutes': duration,
                    'content': desc,
                    'video_url': 'https://example.com/video.mp4',
                    'is_published': True,
                }
            )
            lessons.append(lesson)

        enrollment, _ = Enrollment.objects.get_or_create(
            student=student,
            course=courses[0],
            defaults={
                'active': True,
                'progress': 45,
                'completed': False,
            }
        )

        for lesson in lessons[:2]:
            AttendanceRecord.objects.get_or_create(
                student=student,
                lesson=lesson,
                defaults={'status': 'present'}
            )

        project, _ = ProjectSubmission.objects.get_or_create(
            student=student,
            course=courses[0],
            title='Python Mini Project',
            defaults={
                'lesson': lessons[1],
                'description': 'A small Python project demonstrating loops and conditions.',
                'attachment_url': 'https://example.com/project.zip',
                'status': 'pending',
            }
        )

        Grade.objects.get_or_create(
            project=project,
            defaults={
                'instructor': instructor,
                'score': 86.5,
                'feedback': 'Strong work on logic flow and readability.',
            }
        )

        Invoice.objects.get_or_create(
            student=student,
            due_date=timezone.now().date(),
            defaults={
                'amount': 42000.00,
                'paid': False,
                'status': 'due',
            }
        )

        Notification.objects.get_or_create(
            recipient=student,
            title='Welcome to Tinkacode',
            defaults={
                'message': 'Your first course is available. Start learning today!',
                'notification_type': 'welcome',
            }
        )

        Report.objects.get_or_create(
            title='Weekly progress report',
            report_type='progress',
            generated_by=admin,
            defaults={'data': {'student': student.email, 'progress': 45}}
        )

        LiveClass.objects.get_or_create(
            course=courses[1],
            title='Robotics Live Session',
            defaults={
                'instructor': instructor,
                'description': 'Live Q&A for robotics students.',
                'start_time': timezone.now() + timezone.timedelta(days=1),
                'end_time': timezone.now() + timezone.timedelta(days=1, hours=1),
                'is_live': False,
                'meeting_url': 'https://example.com/live/robotics',
            }
        )

        self.stdout.write(self.style.SUCCESS('Demo data seeded successfully.'))
