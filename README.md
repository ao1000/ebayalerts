# ebayalerts

Overview:
This application is a service that lets users search for products on ebay.com and manage alerts for these products based on prices. Periodic notifications of created alerts will be delivered to the user's email address.

Tools Used:
- Django + Django Rest Framework is used on the backend
- React is used on the frontend
- Since this is a small application sqlite3 is used as the DBMS

Basic Structure:
- React <-> Django <-> ebay

Workflow:
- User enters his/her email address
- If an email address is entered for the first time then a new user will created in the database
- User is redirected to `My Alerts` page where previously created alerts can be managed.
- To create a new alert user navigates to `Add Alert` page
- When a new alert is created a signal is sent in the backend to schedule a periodic alert
- A script will run in the background to send the email notifications according interval saved in the database
