from django import forms
from .models import CTF_challenge

class challangeForm(forms.ModelForm):
    class Meta:
        model = CTF_challenge
        fields = ['challenge_description', 'challenge_flag', 'challenge_title', 'challenge_pts', 'challenge_type', 'challenge_file']
