from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication

from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404

from note.renderer import UserRenderer
from note.serializers import UserSerializer, LoginSerializer, NotebookSerializer
from note.models import CustomUser, Notebook


class RegistrationAPIView(APIView):
    renderer_classes = [UserRenderer]
    authentication_classes = []
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get("email")
            password = serializer.validated_data.get("password")
            first_name = serializer.validated_data.get("first_name")
            last_name = serializer.validated_data.get("last_name")

            user = CustomUser.objects.create_user(
                email=email,
                password=password,
                first_name=first_name,
                last_name=last_name,
            )

            # user_serializer = UserSerializer(user)
            # return Response(user_serializer.data, status=status.HTTP_201_CREATED)
            return Response({"message": "success"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(APIView):
    renderer_classes = [UserRenderer]
    authentication_classes = []
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = request.data.get("email")
            password = request.data.get("password")
            user = authenticate(email=email, password=password)
            if user is not None:
                refresh = RefreshToken.for_user(user)
                return Response(
                    {
                        "message": "Successfully logged in.",
                        "access_token": str(refresh.access_token),
                    },
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"message": "Invalid email or password."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TestAPIView(APIView):
    authentication_classes = [JWTTokenUserAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        authenticated_user = request.user
        user_id = authenticated_user.id
        username = authenticated_user.username

        return Response(
            {"message": f"Authenticated user: {username} (ID: {user_id})"},
            status=status.HTTP_200_OK,
        )


class NoteListAPIView(APIView):
    authentication_classes = [JWTTokenUserAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        authenticated_user = request.user
        if authenticated_user is None:
            return Response(
                {"detail": "User not authenticated."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        notes = Notebook.objects.filter(user=authenticated_user.id)
        serializer = NotebookSerializer(notes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class NoteDetailAPIView(APIView):
    authentication_classes = [JWTTokenUserAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, note_id):
        authenticated_user = request.user
        if authenticated_user is None:
            return Response(
                {"detail": "User not authenticated."},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        user = request.user
        note = get_object_or_404(Notebook, user=user.id, id=note_id)
        serializer = NotebookSerializer(note)
        return Response(serializer.data, status=status.HTTP_200_OK)
