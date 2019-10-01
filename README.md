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
- auth-url: oauth url from auth0

Configure auth stuff:

- auth0 m2m api and application
  - client infos into env vars: `OPZ_CLIENT_ID`, `OPZ_CLIENT_SECRET`, `OPZ_AUDIENCE`
  - symmetric secret into firebase env vars:

```bash
firebase functions:config:set auth.secret="xxx"
```
