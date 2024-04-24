from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from . import views


urlpatterns = [
    path(
        "user/register/", views.RegistrationAPIView.as_view(), name="user_registration"
    ),
    path("user/login/", views.LoginAPIView.as_view(), name="user_login"),
    path("test/protect/", views.TestAPIView.as_view(), name="testing_purpose"),
    path("notes/", views.NoteListAPIView.as_view(), name="list_notes_of_user"),
    path(
        "notes/<int:note_id>/",
        views.NoteDetailAPIView.as_view(),
        name="list_note_by_id",
    ),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/token/verify/", TokenVerifyView.as_view(), name="token_verify"),
]
