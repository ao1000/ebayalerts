from __future__ import absolute_import, unicode_literals
from celery.decorators import task
from eap.celery import app as celery_app
import main.helpers as helpers

"""
@celery_app.on_after_finalize.connect
def setup_periodic_tasks(sender, **kwargs):
    #Calls test('hello') every 10 seconds.
    print(sender)
    sender.add_periodic_task(20.0, test.s('hello'), name='hello every 20')

    # Calls test('world') every 30 seconds
    #sender.add_periodic_task(10.0, send_email.s(),name="Sending mail as cron")

    # for alert in Alert.objects.all():
    #     print(alert)
    #     sender.add_periodic_task(60*alert.interval, send_email_alert.s(alert),name="Sending mail as cron")
"""

@task
def test(args):
    print("RUNNING TEST TASK")
    print(args)

@task
def other_test(*args,**kwargs):
    print(args[0])

@celery_app.task
def new_periodic_task(sender,alert):
    sender.add_periodic_task(60*alert.interval, send_email_alert.s(alert),name="Sending mail as cron")


@task
def send_alert(*args,**kwargs):
    results = helpers.ebay_search(kwargs["search_phrase"])
    helpers.send_email(kwargs["user_email"],results)
    print("Email sent")
