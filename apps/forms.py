# forms.py

from django import forms

class EventForm(forms.Form):
    title = forms.CharField(max_length=100)
    description = forms.CharField(max_length=500, widget=forms.Textarea)
    cost = forms.DecimalField(max_digits=7, decimal_places=2)
    timing = forms.DateTimeField()
    image = forms.ImageField()
