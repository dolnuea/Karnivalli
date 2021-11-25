from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import GameData, UserGameScore, Games
from .serializers import GameDataSerializer, UserGameScoreSerializer
from rest_framework import permissions
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from django.db.models import Q
from django.core import serializers
import json
# Create your views here.
# ListCreateAPIView handles Create in CRUD, RetriveUpdateDestroyAPIView handles RUD in CRUD.


class GameDataCreate(ListCreateAPIView):

    def post(self, request, format='json'):
        
        request.data["owner"] = User.objects.filter(username=request.data["owner"])[0].id
        request.data["opponent"] = User.objects.filter(username=request.data["opponent"])[0].id
        request.data["game"] = Games.objects.filter(game_name=request.data["game"])[0].game_id
        serializer = GameDataSerializer(data=request.data)
        if serializer.is_valid():
            gamedata = serializer.save()
            print(gamedata.game_session_id)
        else: 
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        json = {"game_session_id" : gamedata.game_session_id}
        return Response(json, status=status.HTTP_201_CREATED)

class GameDataUpdate(ListCreateAPIView):

    def post(self, request, format='json'):
        gamedata = GameData.objects.filter(game_session_id=request.data["game_session_id"]).update(status = request.data["status"])
        return Response(request.data, status=status.HTTP_201_CREATED)

class GameDataRetriveList(ListCreateAPIView):

    def post(self, request, format='json'):
        print("Inside get list")
        request.data["owner"] = User.objects.filter(username=request.data["owner"])[0].id
        gamedataList = GameData.objects.filter(Q(owner=request.data["owner"]) | Q(opponent=request.data["owner"])).order_by('-game_session_id')[:8]
        output_data = []
        for gameData in gamedataList:
            output_data.append({"owner":gameData.owner.username, "game_session_id":gameData.game_session_id, "game":gameData.game.game_name, "opponent": gameData.opponent.username, "status":gameData.status})
        print(output_data)
        return Response(json.dumps(output_data), status=status.HTTP_201_CREATED)


class UserGameScoreCreate(ListCreateAPIView):

    def post(self, request, format='json'):
        
        
        request.data["owner"] = User.objects.filter(username=request.data["owner"])[0].id
        request.data["game"] = Games.objects.filter(game_name=request.data["game"])[0].game_id

        gameScoreData = UserGameScore.objects.filter(owner=request.data["owner"], game=request.data["game"])
        if not gameScoreData: 
            serializer = UserGameScoreSerializer(data=request.data)
            if serializer.is_valid():
                gameScoreData = serializer.save()
                score_id = gameScoreData.id
                print(gameScoreData.id)
            else: 
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            gameScoreData.update(score = request.data["score"]+gameScoreData[0].score)
            score_id = gameScoreData[0].id
        json = {"score_id" : score_id}
        return Response(json, status=status.HTTP_201_CREATED)
