import json
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async
from apps.users.models import User
from apps.live_classes.models import LiveClass

class LiveClassConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'live_class_{self.room_name}'

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        await self.send_json({'type': 'connection_established', 'message': 'Connected to live class room.'})

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive_json(self, content, **kwargs):
        event_type = content.get('type')
        payload = content.get('payload', {})

        if event_type == 'join':
            await self.send_json({'type': 'joined', 'payload': {'room': self.room_name}})
        elif event_type == 'heartbeat':
            await self.send_json({'type': 'heartbeat', 'payload': {'status': 'alive'}})

    async def broadcast_live_update(self, event):
        await self.send_json(event['payload'])
