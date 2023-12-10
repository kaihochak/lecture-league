from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User
from django.db.models import Avg

class University(models.Model):
    name = models.CharField(max_length=50, primary_key=True)
    reviews = models.IntegerField(null=True, blank=True)
    image = models.ImageField(upload_to='images/', default='')

    def review_count(self):
        return Review.objects.filter(university=self).count()


class Course(models.Model):
    name = models.CharField(max_length=50, primary_key=True)
    university = models.ForeignKey(University, on_delete=models.CASCADE)
    description = models.CharField(max_length=500, default="No description available")

    def average_workload(self):
        return round(self.review_set.aggregate(Avg('workload'))['workload__avg'] or 0, 2)

    def average_difficulty(self):
        return round(self.review_set.aggregate(Avg('difficulty'))['difficulty__avg'] or 0, 2)

    def average_usefulness(self):
        return round(self.review_set.aggregate(Avg('usefulness'))['usefulness__avg'] or 0, 2)

    
class Review(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    university = models.ForeignKey(University, on_delete=models.CASCADE)
    workload = models.IntegerField(default=0, validators=[MinValueValidator(1), MaxValueValidator(5)])
    difficulty = models.IntegerField(default=0, validators=[MinValueValidator(1), MaxValueValidator(5)])
    usefulness = models.IntegerField(default=0, validators=[MinValueValidator(1), MaxValueValidator(5)])
    review = models.CharField(max_length=500, default="No review available")
    professor = models.CharField(max_length=50, default="No professor available")
    submission_date = models.DateField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, to_field='username', default="No user available")
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)

