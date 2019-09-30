# Order process with zeebe and Camunda Cloud

## Preconditions to run this demo

- Camunda Cloud account to run workflow instances in the cloud
- Firebase account to deploy and execute Google Functions
- Giphy account and API key to search for Gifs
- SendGrid account to send mails

## Setup

Configure the following worker variables:

- firebase-base-url: this is the base url your firebase functions are deployed
- giphy-api-key
- sendgrid-api-key


todos:

- enable IAM api: https://console.cloud.google.com/apis/library/iam.googleapis.com?project=order-process-functions
- add role *Service Account Token Creator* to default service account *App Engine default service account*

