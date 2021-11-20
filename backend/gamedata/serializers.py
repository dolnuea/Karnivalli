from rest_framework.serializers import ModelSerializer
from .models import GameData


class GameDataSerializer(ModelSerializer):

    class Meta:
        model = GameData

        fields = ['owner', 'game', 'status', 'opponent']
