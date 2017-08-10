import os
import smtplib
import mimetypes
from email import encoders
from email.mime.audio import MIMEAudio
from email.mime.base import MIMEBase
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def email_files(logger, email, scenario_name, app_name, file_name, run_time, files=None):
    if files is None:
        files = []

    outer = MIMEMultipart('alternative')
    outer['Subject'] = 'Optimized Gate Allocation Program Results'
    outer['To'] = email
    outer['From'] = 'gate.allocation'
    outer['BCC'] = 'lawrence.ouyang@flysfo.com, yueyilin.qi@flysfo.com'

    for file_data in files:
        ctype, encoding = mimetypes.guess_type(file_data['name'])
        if ctype is None or encoding is not None:
            # No guess could be made, or the file is encoded (compressed), so
            # use a generic bag-of-bits type.
            ctype = 'application/octet-stream'
        maintype, subtype = ctype.split('/', 1)
        if maintype == 'text':
            msg = MIMEText(file_data['data'], _subtype=subtype)
        elif maintype == 'image':
            msg = MIMEImage(file_data['data'], _subtype=subtype)
        elif maintype == 'audio':
            msg = MIMEAudio(file_data['data'], _subtype=subtype)
        else:
            msg = MIMEBase(maintype, subtype)
            msg.set_payload(file_data['data'])
        # Encode the payload using Base64
        encoders.encode_base64(msg)
        # Set the filename parameter
        msg.add_header('Content-Disposition', 'attachment', filename=file_data['name'])
        outer.attach(msg)

    html_f = open(os.path.join(os.path.dirname(__file__), 'email_template.html'), 'r')
    alternative_text = MIMEText('Your gate allocation application has completed. See the attachments for the results.',
                                'text')
    html_data = html_f.read()
    html_data = html_data.replace('PROGRAM_NAME', app_name)
    html_data = html_data.replace('SCENARIO_NAME', scenario_name)
    html_data = html_data.replace('FILE_NAME', file_name)
    html_data = html_data.replace('RUN_TIME', run_time)
    html_email = MIMEText(html_data, 'html')
    html_f.close()

    outer.attach(alternative_text)
    outer.attach(html_email)

    composed = outer.as_string()
    s = smtplib.SMTP('localhost')
    s.sendmail('gate.allocation', [email, 'lawrence.ouyang@flysfo.com', 'yueyilin.qi@flysfo.com'], composed)
    s.quit()


def email_error(logger, email, scenario_name, app_name, file_name, error, files=None):
    if files is None:
        files = []

    outer = MIMEMultipart('alternative')
    outer['Subject'] = 'Optimized Gate Allocation Program Results'
    outer['To'] = email
    outer['From'] = 'gate.allocation'
    outer['BCC'] = 'lawrence.ouyang@flysfo.com, yueyilin.qi@flysfo.com'

    for file_data in files:
        ctype, encoding = mimetypes.guess_type(file_data['name'])
        if ctype is None or encoding is not None:
            # No guess could be made, or the file is encoded (compressed), so
            # use a generic bag-of-bits type.
            ctype = 'application/octet-stream'
        maintype, subtype = ctype.split('/', 1)
        if maintype == 'text':
            msg = MIMEText(file_data['data'], _subtype=subtype)
        elif maintype == 'image':
            msg = MIMEImage(file_data['data'], _subtype=subtype)
        elif maintype == 'audio':
            msg = MIMEAudio(file_data['data'], _subtype=subtype)
        else:
            msg = MIMEBase(maintype, subtype)
            msg.set_payload(file_data['data'])
        # Encode the payload using Base64
        encoders.encode_base64(msg)
        # Set the filename parameter
        msg.add_header('Content-Disposition', 'attachment', filename=file_data['name'])
        outer.attach(msg)

    html_f = open(os.path.join(os.path.dirname(__file__), 'error_email_template.html'), 'r')
    alternative_text = MIMEText('There was an error with running the gate allocation program. {}'.format(error), 'text')
    html_data = html_f.read()
    html_data = html_data.replace('PROGRAM_NAME', app_name)
    html_data = html_data.replace('SCENARIO_NAME', scenario_name)
    html_data = html_data.replace('FILE_NAME', file_name)
    html_data = html_data.replace('ERROR_MESSAGE', repr(error))
    html_email = MIMEText(html_data, 'html')
    html_f.close()

    outer.attach(alternative_text)
    outer.attach(html_email)

    composed = outer.as_string()
    s = smtplib.SMTP('localhost')
    s.sendmail('gate.allocation', [email, 'lawrence.ouyang@flysfo.com', 'yueyilin.qi@flysfo.com'], composed)
    s.quit()
