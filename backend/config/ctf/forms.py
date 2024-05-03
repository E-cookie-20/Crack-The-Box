from django import forms
from .models import Wargame

class challangeForm(forms.ModelForm):
    class Meta:
        model = Wargame
        fields = ['challenge_description', 'challenge_flag', 'challenge_title', 'challenge_pts', 'challenge_type', 'challenge_file']
