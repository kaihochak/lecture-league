from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.views import Token
from .models import University, Course, Review


class UniversitySerializer(serializers.ModelSerializer):
    reviewNum = serializers.SerializerMethodField()

    class Meta:
        model = University
        fields = ['name', 'image', 'reviewNum']

    def get_reviewNum(self, obj):
        return obj.review_count()
    
class CourseSerializer(serializers.ModelSerializer):
    average_workload = serializers.SerializerMethodField()
    average_difficulty = serializers.SerializerMethodField()
    average_usefulness = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ['name', 'university', 'description', 'average_workload', 'average_difficulty', 'average_usefulness']

    def get_average_workload(self, obj):
        return obj.average_workload()

    def get_average_difficulty(self, obj):
        return obj.average_difficulty()

    def get_average_usefulness(self, obj):
        return obj.average_usefulness()
    
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'course', 'university', 'professor', 'workload', 'difficulty', 'usefulness', 'review', 'submission_date', 'user', 'likes', 'dislikes']

# USER Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'first_name', 'last_name']
        
        #to hide passwords from showing up using GET
        extra_kwargs = {'password': {
            'write_only': True,
            'required': True,
        }}
        
    # For hashing passwords for new users
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user) # To create tkens for new users
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        if password:
            instance.set_password(password)
        return super(UserSerializer, self).update(instance, validated_data)