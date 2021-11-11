from django.shortcuts import render

from contact.forms import ContactInquiryForm


def contact_form(request):
    if request.method == 'POST':
        form = ContactInquiryForm(request.POST)
        if form.is_valid():
            form.save()
            return render(request, 'contact/thanks.html', {'name': form.cleaned_data.get('name')})  # type: ignore
    else:
        form = ContactInquiryForm()

    return render(request, 'contact/contact_form.html', {'form': form})
