from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

class HealthCheckView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return Response({'status': 'ok'})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/auth/', include('apps.authentication.urls')),
    path('api/v1/users/', include('apps.users.urls')),
    path('api/v1/courses/', include('apps.courses.urls')),
    path('api/v1/lessons/', include('apps.lessons.urls')),
    path('api/v1/enrollments/', include('apps.enrollments.urls')),
    path('api/v1/attendance/', include('apps.attendance.urls')),
    path('api/v1/projects/', include('apps.projects.urls')),
    path('api/v1/grading/', include('apps.grading.urls')),
    path('api/v1/analytics/', include('apps.analytics.urls')),
    path('api/v1/notifications/', include('apps.notifications.urls')),
    path('api/v1/billing/', include('apps.billing.urls')),
    path('api/v1/reports/', include('apps.reports.urls')),
    path('api/v1/live/', include('apps.live_classes.urls')),
    path('api/v1/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/v1/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('health/', HealthCheckView.as_view(), name='health-check'),
]
