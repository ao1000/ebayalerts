from rest_framework import viewsets, status
from rest_framework.decorators import list_route
from rest_framework.response import Response
from .models import User, Alert
from .serializers import UserSerializer, AlertSerializer
import traceback
from ebaysdk.exception  import ConnectionError
from ebaysdk.finding import Connection
import pprint
from django.db import IntegrityError
from django.db import transaction
# from eap.celery import app as celery_app
# from .tasks import *


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @list_route(methods=['GET'],url_path="find-email/(.*)")
    def find_email(self,request,email):
        try:
            created = False
            u = User.objects.filter(email=email)
            if u:
                u = u[0]
            else:
                u = User.objects.create(email=email)
                created = status.HTTP_201_CREATED
            s = UserSerializer(u)
            return Response(s.data,status=created or status.HTTP_200_OK)
        except Exception as e:
            traceback.print_exc()
            return Response({"error": "User not found"},status=status.HTTP_406_NOT_ACCEPTABLE)

    @list_route(methods=['GET'],url_path="test")
    def test(self,request):
        celery_app.add_periodic_task(5.0, other_test.s('hello from view'), name='add every 10')
        return Response("Celery signal dispatched")


class AlertViewSet(viewsets.ModelViewSet):
    queryset = Alert.objects.select_related("user")
    serializer_class = AlertSerializer

    # Override create function to produce better errors:
    @transaction.atomic
    def create(self,request):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid()
            alert = serializer.save()
            new_periodic_task.delay(alert)
            return Response(serializer.validated_data,status=status.HTTP_201_CREATED)
            #return super(AlertViewSet,self).create(request)

            # make sure at least one result is returned by api call
            """
            api = Connection(domain="svcs.sandbox.ebay.com", appid='AousOmra-alerts-SBX-467ac8c8b-7db12fb6', config_file=None)
            response = api.execute('findItemsByKeywords', {
                                           'keywords' : 'Laptop',
                                           'sortOrder' : 'PricePlusShippingLowest',
                                           'paginationInput' : {
                                                   'entriesPerPage' : 1,
                                                   'pageNumber' : 1
                                               }
                                        })
            print("count is: {}".format(len(response.reply.searchResult.item)))
            pprint.pprint(response.reply.searchResult.item[0])
            return Response(response.dict()['searchResult']['item'],status=status.HTTP_200_OK)
            """
        except IntegrityError as ie:
            traceback.print_exc()
            return Response("You have already created an alert with this search phrase",status=status.HTTP_406_NOT_ACCEPTABLE)
        # except ConnectionError as ce:
        #     print("#####################")
        #     print("Connection error")
        #     print("#####################")
        #     traceback.print_exc()
        #     raise Exception(ce)
        except Exception as e:
            traceback.print_exc()
            return Response(e.__str__(),status=status.HTTP_406_NOT_ACCEPTABLE)

    @list_route(methods=['GET'],url_path="myalerts/(.*)")
    def myalerts(self,request,user_id):
        try:
            assert user_id, "User not provided"
            queryset = self.get_queryset().filter(user_id=user_id)
            serializer = self.get_serializer(queryset,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.__str__()},status=status.HTTP_406_NOT_ACCEPTABLE)
