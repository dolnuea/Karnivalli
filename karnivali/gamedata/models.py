from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class GameData(models.Model):
    # owner = models.ForeignKey(to=User, on_delete=models.CASCADE)
    owner = models.CharField(max_length=30)
    game = models.CharField(max_length=20)
    status = models.CharField(max_length=10)
    opponent = models.CharField(max_length=30)
