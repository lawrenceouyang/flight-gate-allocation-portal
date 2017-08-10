"""
WSGI config for template project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.11/howto/deployment/wsgi/
"""

import os
import sys

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "gate_allocation_wa.settings")

sys.path.append(os.path.join(os.path.dirname(__file__), '../../gate_assignment'))
sys.path.append(os.path.join(os.path.dirname(__file__), '../../email_result'))
sys.path.append(os.path.join(os.path.dirname(__file__), '../../flight_pairing'))
sys.path.append(os.path.join(os.path.dirname(__file__), '../../integrated'))

application = get_wsgi_application()
