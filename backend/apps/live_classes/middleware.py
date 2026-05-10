from channels.middleware import BaseMiddleware
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from apps.users.models import User

@database_sync_to_async
def get_user_from_token(token):
    try:
        access_token = AccessToken(token)
        user_id = access_token['user_id']
        user = User.objects.get(id=user_id)
        return user
    except (InvalidToken, TokenError, User.DoesNotExist):
        return AnonymousUser()

class JWTAuthMiddleware(BaseMiddleware):
    def __init__(self, inner):
        super().__init__(inner)

    async def __call__(self, scope, receive, send):
        # Get token from query parameters
        query_string = scope.get('query_string', b'').decode()
        token = None

        if query_string:
            params = dict(param.split('=') for param in query_string.split('&') if '=' in param)
            token = params.get('token')

        if token:
            scope['user'] = await get_user_from_token(token)
        else:
            scope['user'] = AnonymousUser()

        return await super().__call__(scope, receive, send)