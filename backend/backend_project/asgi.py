import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from apps.live_classes.middleware import JWTAuthMiddleware
import apps.live_classes.routing as live_routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_project.settings')

application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': JWTAuthMiddleware(
        URLRouter(
            live_routing.websocket_urlpatterns
        )
    ),
})
