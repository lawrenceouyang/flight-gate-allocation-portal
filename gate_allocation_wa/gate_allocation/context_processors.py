from django.conf import settings


# noinspection PyUnusedLocal
def version_number(request):
    return {'VERSION': settings.VERSION}


def display_wa_url(request):
    return {'DISPLAY_WA_URL': settings.DISPLAY_WA_URL}
