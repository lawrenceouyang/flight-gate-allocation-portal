from django.http import HttpResponse
import logging

logger = logging.getLogger(__name__)


def get_only(function):
    def wrapper(request, *args, **kw):
        if request.method != 'GET':
            logging.warning("Attempted to make a '{}' method to a GET only URL.".format(request.method))
            return HttpResponse("'{}' method not allowed.".format(request.method))
        else:
            return function(request, *args, **kw)
    return wrapper


def post_only(function):
    def wrapper(request, *args, **kw):
        if request.method != 'POST':
            logging.warning("Attempted to make a '{}' method to a POST only URL.".format(request.method))
            return HttpResponse("'{}' method not allowed.".format(request.method))
        else:
            return function(request, *args, **kw)
    return wrapper


def validate_api_call(response, exceptions=None):
    if exceptions is None:
        exceptions = []
    """ Validates that the API call response is successful response or within the exceptions list """
    if (response.status_code < 200 or response.status_code > 299) and response.status_code not in exceptions:
        logger.critical("status_code={} message=Method '{}' to WS URI '{}' returned a status code '{}' which was not in"
        "the exceptions list.".format(response.request.method, response.status_code, response.request.url,
                                      response.status_code))
        raise Exception("Dynamic Information Display System Webservice Status Code Error. "
                        "Status Code {}".format(response.status_code))
    else:
        logger.info("status_code={} message=Successfully called WS '{}'.".format(response.status_code,
                                                                                 response.request.url))


def ajax_catch(function):
    """ Function Decorator: Error exception for ajax calls. Will log the traceback, user, page, and error. The call will
     then return a 500 """
    def wrapper(request, *args, **kw):
        try:
            return function(request, *args, **kw)
        except Exception as e:
            logger.exception("status_code={} message=Internal Django Error. Ajax URL '{}' raised the error: '{}'."
                             .format(500, request.path, e))
            raise Exception
    return wrapper