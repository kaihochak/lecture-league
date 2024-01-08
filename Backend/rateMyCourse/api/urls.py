from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, UniversityViewSet, CourseViewSet, ReviewViewSet

router = DefaultRouter()
router.register('University', UniversityViewSet, basename='University')
router.register('Course', CourseViewSet, basename='Course')
router.register('users', UserViewSet)
router.register('Review', ReviewViewSet, basename='Review')

urlpatterns = [
    path('', include(router.urls)),
]