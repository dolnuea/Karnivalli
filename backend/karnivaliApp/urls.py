from django.urls import path
from .views import UserList, CustomUserCreate, BlacklistTokenUpdateView

app_name = 'karnivaliApp'

urlpatterns = [
	path('', UserList.as_view(), name='listcreate'),
	path('user/create/', CustomUserCreate.as_view(), name="create_user"),
    path('user/logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist')
]