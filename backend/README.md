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

## Render Deployment (Production)

This backend can be deployed to Render as a production-ready ASGI app with WebSocket support.

### Step-by-step Render setup

1. Create a Render account at https://render.com and connect your GitHub repository.
2. Add a **PostgreSQL** database from the Render dashboard.
3. Add a **Redis** instance from the Render dashboard.
4. Add the `render.yaml` file to this repository so Render can detect your services.
5. Create a new **Web Service** on Render:
   - Environment: `Docker`
   - Dockerfile path: `Dockerfile`
   - Build command: `pip install -r requirements.txt`
   - Start command: `gunicorn backend_project.asgi:application --bind 0.0.0.0:$PORT --workers 3 --worker-class uvicorn.workers.UvicornWorker`
   - Env vars: `DJANGO_SETTINGS_MODULE=backend_project.settings`, `PYTHONPATH=/app`
6. Create a new **Worker Service** for Celery:
   - Environment: `Docker`
   - Dockerfile path: `Dockerfile`
   - Build command: `pip install -r requirements.txt`
   - Start command: `celery -A backend_project worker --loglevel=info --concurrency=2`
   - Env vars: same as web service.
7. Configure Render environment variables with production values for `DJANGO_SECRET_KEY`, `DJANGO_DEBUG=False`, `ALLOWED_HOSTS`, `DATABASE_URL`, `REDIS_URL`, `CELERY_BROKER_URL`, `CELERY_RESULT_BACKEND`, `CORS_ALLOWED_ORIGINS`, and `CSRF_TRUSTED_ORIGINS`.
8. Deploy the web service.
9. Open Render shell or use the Render dashboard to run migrations:
   ```bash
   python manage.py migrate
   python manage.py seed_data
   python manage.py createsuperuser
   ```

### Example environment variables for Render

```bash
DJANGO_SECRET_KEY=<your-secure-key>
DJANGO_DEBUG=False
ALLOWED_HOSTS=your-app.onrender.com
CORS_ALLOWED_ORIGINS=https://hawk-green.vercel.app
CSRF_TRUSTED_ORIGINS=https://hawk-green.vercel.app
DATABASE_URL=postgresql://<user>:<pass>@<host>:<port>/<db>?sslmode=require
REDIS_URL=redis://:<pass>@<host>:<port>
CELERY_BROKER_URL=redis://:<pass>@<host>:<port>/1
CELERY_RESULT_BACKEND=redis://:<pass>@<host>:<port>/2
JWT_ACCESS_LIFETIME_MINUTES=15
JWT_REFRESH_LIFETIME_DAYS=7
```

### Frontend integration

Set the Vercel frontend environment variable:

```bash
VITE_API_URL=https://your-app.onrender.com/api/v1
VITE_WS_URL=wss://your-app.onrender.com
```

## Notes

This backend is intentionally built as a production-ready API layer, with clean app separation, JWT auth, role-based permissions, and centralized routing.
