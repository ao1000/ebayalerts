import requests


class EbayClient(object):
    def __init__(self):
        self.url = "svcs.sandbox.ebay.com"
        self.app_id = "AousOmra-alerts-SBX-467ac8c8b-7db12fb6"
        self.dev_id = "e99b158d-97ce-4cb4-b2ec-35cab454af78"
        self.cert_id = "SBX-67ac8c8b107a-58b2-44f8-8c69-c2d2"
        self.response_format = "json"


    def fetch(method="GET",data={}):
        return requests.request(
            method,
            self.url
            data=data
            verify=False,
        )

    def connection():
        

    def search(*args,**kwargs):

        r = self.fetch("GET",kwargs)
        return r.json()
