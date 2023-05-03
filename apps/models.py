from django.contrib.auth.hashers import make_password, check_password
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, username, password):
        user = self.model(username=username, password=make_password(password))
        user.save(using=self.db)
        return user


    def check_user_password(self, username, password):
        try:
            user = self.model.objects.get(username=username)
            return user if user.check_password(password) else False
        except self.model.DoesNotExist:
            return None


class User(AbstractBaseUser):
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)

    objects = UserManager()
    USERNAME_FIELD = 'username'

    def __str__(self):
        return self.username

    class Meta:
        managed = True
        db_table = 'user'


class EventManager(models.Manager):
    def create_event(self, user, title, description, cost, timing, image):
        event = self.model(
            userid=user,
            title=title,
            description=description,
            cost=cost,
            timing=timing,
            image=image.read()
        )

        event.save(using=self.db)
        return event


    def get_event_for_user(userid):
        try:
            event = self.model.objects.get(userid=userid)
            return event
        except self.model.DoesNotExist:
            return None


class Event(models.Model):
    userid = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100, null=False)
    description = models.TextField(max_length=500, null=False)
    cost = models.DecimalField(max_digits=7, decimal_places=2, null=False)
    timing = models.DateTimeField(null=False)
    created_at = models.DateTimeField(auto_now_add=True, null=False)
    image = models.BinaryField(null=True, blank=True)

    objects = EventManager()

    def __str__(self):
        return self.title


class LikeManager(models.Manager):
    def create_like_event(userid, eventid):
        like = self.model(userid=userid, eventid=eventid)
        like.save(using=self.db)
        return like


    def get_likes_for_user(userid):
        try:
            like = self.model.objects.get(userid=userid)
            return like
        except self.model.DoesNotExist:
            return None


class Like(models.Model):
    userid = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    eventid = models.ForeignKey(Event, on_delete=models.CASCADE, null=False)
    created_at = models.DateTimeField(auto_now_add=True, null=False)

    objects = LikeManager()

    def __str__(self):
        return f"{self.user} liked {self.event}"