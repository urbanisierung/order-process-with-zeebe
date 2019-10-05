# Order process with zeebe and Camunda Cloud

## Intro

- Mike: Announcing Camunda Cloud: https://zeebe.io/blog/2019/09/announcing-camunda-cloud/
- Bernd Rücker: https://blog.bernd-ruecker.com/camunda-cloud-the-why-the-what-and-the-how-8198f0a8c33b
- Josh: Getting started: https://zeebe.io/blog/2019/09/getting-started-camunda-cloud/

## Motivation

order process with zeebe, serverless orchestration, free tier, service authentication

## Preconditions to run this demo

- Camunda Cloud account to run workflow instances in the cloud
  - apply here: https://zeebe.io/cloud/
  - login here: https://camunda.io
- Firebase account to deploy and execute Google Functions
  - login here with your google account: https://firebase.google.com
- Giphy account and API key to search for Gifs
  - not really mandatory, but nice to search a gif
- SendGrid account to send mails
  - not mandatory, but cool to send a welcome mail from our order process

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

Set env vars:

- `OPZ_CLIENT_ID`: oauth client id of m2m app in auth0
- `OPZ_CLIENT_SECRET`: oauth client secret of m2m app in auth0
- `OPZ_AUDIENCE`: audience of m2m app in auth0
- `CC_CLUSTER_UUID`: cluster uuid in camunda cloud
- `CC_BASE_URL`: base url to connect to camunda cloud
- `CC_CLIENT_ID`: created client id of camunda cloud cluster
- `CC_CLIENT_SECRET`: corresponding secret of client
- `CC_AUTH_URL`: oauth url to get access tokens

shop deployed on digital ocean: http://139.59.157.127:8080/
