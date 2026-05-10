from django.urls import re_path
from .consumers import LiveClassConsumer

websocket_urlpatterns = [
    re_path(r'ws/live/(?P<room_name>[^/]+)/$', LiveClassConsumer.as_asgi()),
]
