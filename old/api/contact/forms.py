from django import forms

from contact.models import ContactInquiry


class ContactInquiryForm(forms.ModelForm):

    def __init__(self, *a, **kw):
        kw.setdefault('label_suffix', '')
        super().__init__(*a, **kw)

    class Meta:
        model = ContactInquiry
        fields = ('name', 'email', 'message')
