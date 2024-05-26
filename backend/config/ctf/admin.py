from django.contrib import admin
from .models import CTF,CTF_challenge,CTF_user


# Register your models here.
admin.site.register(CTF)
admin.site.register(CTF_challenge)
admin.site.register(CTF_user)
