import json
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
from apps.users.models import User
from apps.live_classes.models import LiveClass

class LiveClassConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        # Check if user is authenticated
        if isinstance(self.scope['user'], AnonymousUser):
            await self.close()
            return

        self.user = self.scope['user']
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'live_class_{self.room_name}'

        # Check if user has permission to join this live class
        if not await self.can_join_live_class():
            await self.close()
            return

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        await self.send_json({'type': 'connection_established', 'message': 'Connected to live class room.'})

    async def disconnect(self, close_code):
        if hasattr(self, 'room_group_name'):
            await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive_json(self, content, **kwargs):
        event_type = content.get('type')
        payload = content.get('payload', {})

        if event_type == 'join':
            await self.send_json({'type': 'joined', 'payload': {'room': self.room_name}})
        elif event_type == 'heartbeat':
            await self.send_json({'type': 'heartbeat', 'payload': {'status': 'alive'}})
        elif event_type == 'message' and await self.can_send_message():
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'broadcast_message',
                    'message': payload.get('message', ''),
                    'sender': self.user.email,
                    'sender_id': self.user.id,
                }
            )

    async def broadcast_message(self, event):
        await self.send_json({
            'type': 'message',
            'payload': {
                'message': event['message'],
                'sender': event['sender'],
                'sender_id': event['sender_id'],
                'timestamp': event.get('timestamp'),
            }
        })

    async def broadcast_live_update(self, event):
        await self.send_json(event['payload'])

    @database_sync_to_async
    def can_join_live_class(self):
        try:
            live_class = LiveClass.objects.get(id=self.room_name)
            # Check if user is instructor or enrolled student
            if self.user.role == 'instructor' or self.user.role == 'admin':
                return live_class.instructor == self.user or self.user.role == 'admin'
            if self.user.role == 'student':
                return live_class.course.enrollments.filter(student=self.user, active=True).exists()
            return False
        except LiveClass.DoesNotExist:
            return False

    @database_sync_to_async
    def can_send_message(self):
        # Only instructors and admins can send messages for now
        return self.user.role in ['instructor', 'admin']
