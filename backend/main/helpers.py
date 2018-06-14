import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from ebaysdk.exception  import ConnectionError
from ebaysdk.finding import Connection as Finding
import pprint
from eap.config import *

def ebay_search(phrase):
        api = Finding(domain=CONFIG_EBAY["DOMAIN"], appid=CONFIG_EBAY["APP_ID"], config_file=None)
        response = api.execute('findItemsByKeywords', {
                                       'keywords' : phrase,
                                       'sortOrder' : 'PricePlusShippingLowest',
                                       'paginationInput' : {
                                               'entriesPerPage' : 20,
                                               'pageNumber' : 1
                                           }
                                    })
        return response.dict().get("searchResult",{}).get("item",[])


def html_email(results,user=""):
    head = """ <!doctype html> <html> <head> <meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/> <title>Webpage</title> </head> <style>/* INLINE STYLE for email */ *{margin: 0; padding: 0; font-family: sans-serif; font-size: 11pt;}html,body{background-color: rgb(240,240,240);}.title{font}table#results{width: 80%; padding: 15px; margin-left: 10%; margin-right: auto; margin-top: 20px; text-align: left; vertical-align: middle; border-collapse: collapse; background-color: rgb(250,250,250);}table#results th{text-align: center; font-size: 12pt; font-weight: bold; background-color: rgb(52, 152, 219); color: #FFF; padding: 20px;}table#results tr{background-color: rgb(250,250,250);}table#results td{background-color: rgb(250,250,250);}table#head{width: 40%; padding: 25px; margin-left: 30%; margin-right: auto; margin-top: 20px; text-align: center; vertical-align: middle; border-collapse: collapse; background-color: rgb(240,240,240) !important;}.thumb{height: 64px; width: 64px; padding: 5px; margin: 0;}table#head tr{background-color: rgb(240,240,240) !important;}table#head tr td{padding: 20px; background-color: rgb(240,240,240) !important;}.title{padding: 20px; font-size: 18pt;}.subtitle{font-size: 12pt; vertical-align: top; margin: 0;}</style> <body> <table id="head"> <tr> <td><span class="title">Hello There!</span></td></tr><tr> <td><span class="subtitle">Here are some updates!</span></td></tr></table> <table id="results"> <tr> <th></th> <th>Price ($)</th> <th>Title</th> <th>Starts at</th> <th>Ends at</th> <th>view on ebay</th> </tr> """

    foot = """</table></body></html>"""

    # order: galleryUrl, price, starts at , ends at , ebay link
    row = """ <tr><td><img class="thumb" src="{}"/></td><td>{}</td><td>{}</td><td>{}</td><td>{}</td><td><a href="{}" target="_blank">view on ebay.com</td></tr> """

    mid = ""
    if results:
        for x in results:
            mid += row.format(
                    x.get("galleryURL",""),
                    x.get("sellingStatus",{}).get("currentPrice",{}).get("value",""),
                    x.get("title"),
                    x.get("listingInfo",{}).get("startTime",""),
                    x.get("listingInfo",{}).get("endTime",""),
                    x.get("viewItemURL","")
                )
    else:
        mid = """ <tr><td colspan="6">Your search did not return any results</td></tr> """
    return head+mid+foot


def send_email(to,results,msg_type="html"):
    fromaddress = CONFIG_EMAIL["ADDR"]
    passwd = CONFIG_EMAIL["PWD"]
    toaddr = to
    msg = MIMEMultipart()
    msg['From'] = fromaddress
    msg['To'] = toaddr
    msg['Subject'] = "Scheduled Alert"
    if msg_type == "html":
        results = html_email(results)
    msg.attach(MIMEText(results, msg_type))
    connection = smtplib.SMTP(CONFIG_EMAIL["SMTP_ADDR"], CONFIG_EMAIL["SMTP_PORT"])
    connection.starttls()
    connection.login(fromaddress, passwd)
    connection.sendmail(fromaddress, toaddr, msg.as_string())
    connection.quit()
