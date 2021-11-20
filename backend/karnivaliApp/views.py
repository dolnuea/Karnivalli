from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CustomUserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny


class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CustomUserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        print("inside api user")
        serializer = CustomUserSerializer(data=request.data)
        if(User.objects.filter(username=request.data['username'])):
            return Response("Exists", status=status.HTTP_401_UNAUTHORIZED)

        if serializer.is_valid():
            user = serializer.save()

            if user:
                print("api user")
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            print("Refresh token = ", request.data["refresh_token"])
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            print("Token = ", token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)
