from django.db import models
from django.utils import timezone
from django_celery_beat.models import PeriodicTask
from django.contrib import admin

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=200,null=True,blank=True)
    email = models.EmailField(max_length=200)

    def __str__(self):
        return self.email

class Alert(PeriodicTask):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    search_phrase = models.TextField()
    date_created = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ('user','search_phrase')

    def __str__(self):
        return "{} | {}".format(self.user.email,self.search_phrase)

admin.site.register(User)
admin.site.register(Alert)
