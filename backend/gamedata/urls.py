from django.urls import path
from .views import GameDataCreate, GameDataRetriveList

app_name = 'gamedata'

urlpatterns = [
    path('create/', GameDataCreate.as_view(), name="create_gamedata"),
    path('list/<int:id>', GameDataRetriveList.as_view(), name="retrive_gamedata")
]
