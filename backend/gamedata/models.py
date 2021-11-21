from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Games(models.Model):
    game_id = models.BigAutoField(primary_key=True)
    game_name = models.CharField(max_length=20)

    class Meta:
        db_table = 'games'


class GameData(models.Model):
    game_session_id = models.BigAutoField(primary_key=True)
    owner = models.ForeignKey(to=User, related_name="owner", on_delete=models.CASCADE)
    # owner = models.CharField(max_length=30)
    game = models.ForeignKey(to=Games, on_delete=models.CASCADE)
    status = models.CharField(max_length=10)
    opponent = models.ForeignKey(to=User, related_name="opponent", on_delete=models.CASCADE)

    class Meta:
        db_table = 'game_data'

class UserGameScore(models.Model):
    owner = models.ForeignKey(to=User, on_delete=models.CASCADE)
    game = models.ForeignKey(to=Games, on_delete=models.CASCADE)
    score = models.BigIntegerField()

    class Meta:
        db_table = 'user_game_score'