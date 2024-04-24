from rest_framework import serializers
from note.models import CustomUser, Notebook
from django.utils import timezone


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ["id", "email", "password", "first_name", "last_name"]
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class NotebookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notebook
        fields = ["id", "user", "title", "content", "created_at", "last_modified"]


class CreateNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notebook
        fields = ["title", "content"]
