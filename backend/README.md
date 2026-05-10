# Tinkacode Backend

This repository contains the Django backend for the Tinkacode multi-role edtech platform.

## Architecture

- Python 3.12
- Django 4.x
- Django REST Framework
- Simple JWT authentication
- PostgreSQL database
- Redis for Channels and Celery
- Django Channels for WebSocket live classes
- Celery for background task processing
- Docker + Docker Compose for local and production orchestration
- OpenAPI docs with drf-spectacular

## Project Structure

- `backend_project/` - Django project configuration
- `apps/authentication/` - JWT login, refresh, logout
- `apps/users/` - custom user model and user APIs
- `apps/courses/` - course management
- `apps/lessons/` - lesson content and schedules
- `apps/enrollments/` - student enrollments and progress
- `apps/attendance/` - attendance tracking
- `apps/projects/` - project submissions
- `apps/grading/` - grading and feedback
- `apps/analytics/` - analytics snapshots and dashboard endpoints
- `apps/notifications/` - notification delivery and history
- `apps/billing/` - invoices and billing records
- `apps/reports/` - report generation and retrieval
- `apps/live_classes/` - live class events and WebSocket routing

## Setup

1. Copy environment variables:

```bash
cp .env.example .env
```

2. Build and start containers:

```bash
docker compose build
docker compose up -d
```

3. Run migrations:

```bash
docker compose exec backend python manage.py migrate
```

4. Seed demo data:

```bash
docker compose exec backend python manage.py seed_data
```

5. Create a superuser:

```bash
docker compose exec backend python manage.py createsuperuser
```

6. Open the API docs:

- `http://localhost:8000/api/v1/docs/`
- `http://localhost:8000/health/`

## Commands

- `pip install -r requirements.txt`
- `python manage.py migrate`
- `python manage.py runserver`
- `celery -A backend_project worker --loglevel=info`
- `celery -A backend_project beat --loglevel=info`

## Notes

This backend is intentionally built as a production-ready API layer, with clean app separation, JWT auth, role-based permissions, and centralized routing.
