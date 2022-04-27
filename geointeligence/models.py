from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Topic(models.Model):
    topic = models.CharField(max_length =100)
    frequency = models.IntegerField()
    date = models.DateTimeField(blank=True, auto_now_add=True)
    class Meta:
        managed = True
        db_table = 'topic'

class Communa(models.Model):
    name = models.CharField(max_length =100)    
    class Meta:
        managed = True
        db_table = 'communa'

class Indicator(models.Model):
    indicator_01 = models.FloatField()
    indicator_02 = models.FloatField()
    indicator_03 = models.FloatField()
    date = models.DateTimeField(blank=True, auto_now_add=True)
    class Meta:
        managed = True
        db_table = 'indicator'

class Usertopic(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )
    topic = models.ForeignKey(
        Topic,
        on_delete=models.CASCADE,
    )
    class Meta:
        managed = True
        db_table = 'user_topic'
