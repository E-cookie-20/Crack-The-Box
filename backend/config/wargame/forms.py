from django import forms
from .models import Wargame

class WargameForm(forms.ModelForm):
    class Meta:
        model = Wargame
        fields = ['quiz_description', 'quiz_flag', 'quiz_title', 'quiz_level', 'quiz_type', 'quiz_file']
