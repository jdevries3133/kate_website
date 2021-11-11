"""Template library for building absolute urls, which the extension templates
use, since all of their requests are cross-site.

src: https://stackoverflow.com/questions/19024159/how-to-reverse-a-name-to-a-absolute-url-in-django-template/34630561"""

from django import template
from django.urls import reverse


register = template.Library()


@register.simple_tag(takes_context=True)
def abs_url(context, view_name, *args, **kwargs):
    return context["request"].build_absolute_uri(
        reverse(view_name, args=args, kwargs=kwargs)
    )
