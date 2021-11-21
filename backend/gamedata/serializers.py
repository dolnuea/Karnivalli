from rest_framework.serializers import ModelSerializer
from .models import GameData, UserGameScore, Games


class GameDataSerializer(ModelSerializer):

    class Meta:
        model = GameData
        fields = ['owner', 'game', 'status', 'opponent']

class GamesSerializer(ModelSerializer):

    class Meta:
        model = Games
        fields = ['game_id', 'game_name']


class UserGameScoreSerializer(ModelSerializer):

    class Meta:
        model = UserGameScore
        fields = ['owner', 'game', 'score']
