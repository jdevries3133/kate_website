from django.core.management.base import BaseCommand
from contact.models import ContactInquiry
from contact.services import notify_me


class Command(BaseCommand):
    help = 'Send notifications for all pending contact inquiries.'

    def handle(self, *_, **__):
        qs = ContactInquiry.objects.filter(notification_sent=False)  # type: ignore
        for submission in qs:
            notify_me(
                name=str(submission.name),
                email=str(submission.email), 
                message=str(submission.message)
            )
            submission.notification_sent = True
        ContactInquiry.objects.bulk_update(  # type: ignore
            qs,
            ('notification_sent',)
        )
