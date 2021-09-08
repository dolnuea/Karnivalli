"""
ASGI config for karnivali project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_applicationfrom channels.routing import ProtocolTypeRouter,URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import path
from .consumers import GameRoom


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'karnivali.settings')

application = get_asgi_application()


application= ProtocolTypeRouter(
    {
        'websocket':AuthMiddlewareStack(URLRouter([
            path('ws/game/<room_code>' , GameRoom)

        ]))
    }
)