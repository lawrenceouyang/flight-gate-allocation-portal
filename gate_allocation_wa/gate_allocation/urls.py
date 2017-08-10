from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^login/$', views.login, name='login'),
    url(r'^logout/$', views.logout, name='logout'),

    url(r'^run-gate-allocation/$', views.gate_allocation, name='gate_allocation'),
    url(r'^run-flight-pairing/$', views.flight_pairing, name='flight_pairing'),
    url(r'^run-pair-and-assign/$', views.pair_and_assign, name='pair_and_assign')
]
