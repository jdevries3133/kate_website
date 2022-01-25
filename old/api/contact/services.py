from django.core.mail import send_mail
from django.conf import settings


def notify_me(*, name: str, email: str, message: str) -> None:
    msg = (
        "A contact form submission was received\n"
        f"Message was from {name} <{email}>\n"
        f'Message:\n\n{message}\n'
    )
    send_mail(
        'Contact Form Submission Received',
        msg,
        settings.EMAIL_HOST_USER,
        [settings.EMAIL_HOST_USER],
        fail_silently=False
    )
