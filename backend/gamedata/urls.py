from django.urls import path
from .views import GameDataCreate, GameDataRetriveList, UserGameScoreCreate, GameDataUpdate

app_name = 'gamedata'

urlpatterns = [


    # Requires owner, game, opponent and initial status in json format in the body of the request:
    # Enpoint: api/gamedata/create_game/
    # example:
    # {
    #   "owner": "user1",
    #    "game": "tic-tac-toe",
    #    "status": "InProgress": ,
    #    "opponent": "user2"
    # }
    path('create_game/', GameDataCreate.as_view(), name="create_gamedata"),

    # Requires game session id and status in json format in the body of the request:
    # Enpoint: api/gamedata/update_game/
    # example:
    # {
    #    "game_session_id": 2,
    #    "status": "draw"
    # }
    path('update_game/', GameDataUpdate.as_view(), name="update_gamedata"),


    # Requires owner ,score and game data in json format in the body of the request:
    # Enpoint: api/gamedata/createOrUpdate_game_score/
    # example:
    # {
    #    "owner": "user1",
    #    "game": "tic-tac-toe",
    #    "score":  110
    # }
    path('createOrUpdate_game_score/',
         UserGameScoreCreate.as_view(), name="create_gamescore"),


    # Requires username in jasan format in the body of the request:
    # Enpoint: api/gamedata/game_data_list/
    # example:
    # {
    #    "owner": "user1"
    # }
    path('game_data_list/', GameDataRetriveList.as_view(), name="retrive_gamedata")
]
