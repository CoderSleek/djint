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
    # iduser = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)

    objects = UserManager()
    USERNAME_FIELD = 'username'

    def __str__(self):
        return self.username

    class Meta:
        managed = True
        db_table = 'user'
