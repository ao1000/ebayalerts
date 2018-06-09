from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
import time
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'eap.settings')

app = Celery('eap',broker = "redis://127.0.0.1:6379")

app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()


@app.task(bind=True)
def send_email(self):
    print("start sending email")
    address = "aous4ebayalerts@gmail.com"
    passwd = "Ami0Uy@34xw!"
    fromaddr = "YOUR ADDRESS"
    toaddr = "aous.omr@gmail.com"
    msg = MIMEMultipart()
    msg['From'] = address
    msg['To'] = toaddr
    msg['Subject'] = "Test Email"

    body = "This is a test email sent from python script"
    msg.attach(MIMEText(body, 'plain'))
    connection = smtplib.SMTP('smtp.gmail.com', 587)
    connection.starttls()
    connection.login(address, passwd)
    text = msg.as_string()
    connection.sendmail(address, toaddr, text)
    connection.quit()
    print("Email sent")


@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))


@app.task(bind=True)
def sleep_task(self):
    time.sleep(10)
    print("Slept for 10 seconds before printing this")
