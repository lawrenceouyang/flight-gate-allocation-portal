import logging
import threading
import xlrd
from django.shortcuts import render
from json import loads, dumps
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from requests import post
from django.contrib.auth import logout as django_logout
from .forms import UploadExcelForm, FlightPairingForm, FlightGateForm
from helpers import validate_api_call, get_only, post_only, ajax_catch

from gate_assignment import validate_excel as ga_validate_excel
from gate_assignment import gate_assignment

from flight_pairing import validate_excel as fp_validate_excel
from flight_pairing import flight_pairing as fp_program

from integrated import validate_excel as paa_validate_excel
from integrated import integrate_pairing_assignment as paa_program

logger = logging.getLogger(__name__)


def index(request):
    return render(request, 'index.html')


@csrf_exempt
@ajax_catch
@post_only
def login(request):
    if request.method == 'POST':
        credentials = loads(request.body)
        # Check if username is an email and split '@' location
        if "@" in credentials['username']:
            credentials['username'] = credentials['username'].split("@")[0]

        login_response = post(settings.AD_WS_URL, data={'username': credentials['username'],
                                                        'password': credentials['password']})
        validate_api_call(login_response)
        login_data = login_response.json()['response']
        if login_data['validUsername'] and login_data['validPassword']:
            request.session['username'] = credentials['username']
            request.session['fullname'] = login_data['fullName']
            return JsonResponse({'username': credentials['username'], 'fullname': login_data['fullName']})
        else:
            return HttpResponse("Incorrect username or password.", status=403)


@ajax_catch
@get_only
def logout(request):
    request.session.clear()
    django_logout(request)
    return HttpResponse()


@csrf_exempt
@ajax_catch
@post_only
def gate_allocation(request):
    data = request.POST
    form = UploadExcelForm(data)
    if form.is_valid() and request.FILES:
        logger.info('Successfully validated form uploaded for gate assignment by user "{}".'.format(
            request.session['fullname']))
        # Copy the uploaded file into a string to pass
        file_data = ''
        for chunk in request.FILES['file']:
            file_data += chunk

        # Take the string and read it as an excel workbook
        book = xlrd.open_workbook(file_contents=file_data)

        # Validate the excel uploaded contains all the correct sheets in it
        excel_is_valid, error_message = ga_validate_excel(logger, book, data['maxSolveTime'], data['resolution'])
        if not excel_is_valid:
            logger.warning('Failed to validate excel for gate assignment uploaded by user "{}" with error "{}".'.format(
                request.session['fullname'], error_message))
            return HttpResponse(error_message, status=400)
        # Spawn a separate thread to run the gate allocation program and let the user know it was successful
        # If running locally, use the test gate assignment function
        t = threading.Thread(target=gate_assignment, args=(logger, file_data, request.FILES['file'].name,
                                                           data['scenarioName'], data['email'], data['maxGateTime'],
                                                           data['towOn'], data['towOff'], data['intergateTime'],
                                                           data['incConst'], data['maxSolveTime'], data['resolution'],
                                                           data['makeGanttCharts'], data['colorByAircraft']))
        t.setDaemon(True)
        t.start()
        return HttpResponse()
    else:
        logger.error('Could not validate upload submission by {}.'.format(request.session['fullname']))
        logger.error('Invalid_Data: {}'.format(dumps(data), indent=4))
        error_message = 'There was a problem validating your submission. Please refresh the page and try again.'
        return HttpResponse(error_message, status=400)


@csrf_exempt
@ajax_catch
@post_only
def flight_pairing(request):
    data = request.POST
    form = FlightPairingForm(data)
    if form.is_valid() and request.FILES:
        logger.info('Successfully validated form upload for flight pairing by user "{}"'.format(
            request.session['fullname']))
        file_data = ''
        for chunk in request.FILES['file']:
            file_data += chunk

        book = xlrd.open_workbook(file_contents=file_data)
        excel_is_valid, error_message = fp_validate_excel(logger, book)
        if not excel_is_valid:
            logger.warning('Failed to validate excel for flight pairing uploaded by user "{}" with error "{}".'.format(
                request.session['fullname'], error_message))
            return HttpResponse(error_message, status=400)

        t = threading.Thread(target=fp_program, args=(logger, file_data, request.FILES['file'].name,
                                                      data['scenarioName'], data['email'], data['intergateTime'],
                                                      data['hardMaxConstraint'] == "true", data['prefIncrement'],
                                                      data['maxSolveTime']))
        t.setDaemon(True)
        t.start()
        return HttpResponse()

    else:
        logger.error('Could not validate upload submission by {}.'.format(request.session['fullname']))
        for key in form.errors:
            logger.error('{}: {}'.format(key, form.errors[key]))
        error_message = 'There was a problem validating your submission. Please refresh the page and try again.'
        return HttpResponse(error_message, status=400)


@csrf_exempt
@ajax_catch
@post_only
def pair_and_assign(request):
    data = request.POST
    form = FlightGateForm(data)
    if form.is_valid() and request.FILES:
        logger.info('Successfully validated form upload for pairing and assignment by user "{}"'.format(
            request.session['fullname']))
        file_data = ''
        for chunk in request.FILES['file']:
            file_data += chunk

        book = xlrd.open_workbook(file_contents=file_data)

        excel_is_valid, error_message = paa_validate_excel(logger, book)
        if not excel_is_valid:
            logger.warning('Failed to validate excel for flight pairing uploaded by user "{}" with error "{}".'.format(
                request.session['fullname'], error_message))
            return HttpResponse(error_message, status=400)

        t = threading.Thread(target=paa_program, args=(logger, file_data, request.FILES['file'].name,
                                                       data['scenarioName'], data['email'],
                                                       data['hardMaxConstraint'] == "true", data['prefIncrement'],
                                                       data['maxFlightSolveTime'], data['intergateTime'],
                                                       data['incConst'], data['maxGateSolveTime'], data['resolution']))
        t.setDaemon(True)
        t.start()
        return HttpResponse()

    else:
        logger.error('Could not validate upload submission by {}.'.format(request.session['fullname']))
        for key in form.errors:
            logger.error('{}: {}'.format(key, form.errors[key]))
        error_message = 'There was a problem validating your submission. Please refresh the page and try again.'
        return HttpResponse(error_message, status=400)