from django.db import models
from django.utils import timezone

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200)

    def __str__(self):
        return self.email

class Alert(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    search_phrase = models.TextField()
    date_created = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)

    class Meta:
        unique_together = ('user','search_phrase')

    def __str__(self):
        return "{} | {}".format(self.user.email,self.search_phrase)
