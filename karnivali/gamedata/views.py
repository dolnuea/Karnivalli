from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import GameData
from .serializers import GameDataSerializer
from rest_framework import permissions

# Create your views here.
# ListCreateAPIView handles Create in CRUD, RetriveUpdateDestroyAPIView handles RUD in CRUD.


class GameDataCreate(ListCreateAPIView):

    serializer_class = GameDataSerializer

    # For a user to be able to create gamedata he must be authenticated.
    permissions_classes = (permissions.IsAuthenticated,)
#

    def perform_create(self, serializer):
        # It adds owner to the current logged in user.
        print("In Perform Create")
        serializer.save(owner=self.request.user)

    # How to retrive the records for the current logged in users.
    def get_queryset(self):
        return GameData.objects.filter(owner=self.request.user)


class GameDataRetriveList(RetrieveUpdateDestroyAPIView):

    serializer_class = GameDataSerializer
    permission_classes = (permissions.IsAuthenticated,)
    lookup_field = "id"

    def get_queryset(self):
        return GameData.objects.filter(owner=self.request.user)
