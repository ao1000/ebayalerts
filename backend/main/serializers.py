from .models import User,Alert
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class AlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alert
        fields = ( 'id','user_email','user_id', 'search_phrase', 'date_created','is_active','interval')

    user_id = serializers.IntegerField(write_only=True)
    user_email = serializers.CharField(source="user.email",read_only=True)
