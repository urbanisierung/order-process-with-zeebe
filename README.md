# Order process with zeebe and Camunda Cloud

So you wanna implement an order process? Your welcome!

## Intro

This is one of the first introductions to Camunda Cloud which was announced some weeks ago. With this project I want to show you how you can integrate with Camunda Cloud. Topics like orchestrating microservices especially Google Firebase Functions are described in this project to show you how an orchestration could look like.

But before we start I would like to recommend some readings:

- Mike announces [Camunda Cloud](https://zeebe.io/blog/2019/09/announcing-camunda-cloud/): he is the product manager of the core product: zeebe - let him know what you're missing.
- Bernd Rücker is one of the founders of Camunda. He explains [the advantages of cloud and the trend of a microservice implementaton](https://blog.bernd-ruecker.com/camunda-cloud-the-why-the-what-and-the-how-8198f0a8c33b)
- Josh: In my career I never met someone like Josh, in a very positive way. Get started with the camuna cloud by reading his blog [post](https://zeebe.io/blog/2019/09/getting-started-camunda-cloud/)

## Motivation

Via the intro I've already introduced some very cool readings about Camunda Cloud. Someone could ask: why another project to learn about BPMN or especially a BPMN cloud solution. From my point of view the answer is very easy: In my career I've also build order processes. I know the pain the difficulties introducing it. Well, to be honest, with Camunda Cloud it's straight forward. Let me show you with this project.

Let me show you how to secure serice request with standard JSON web tokens, orchestrate services with a BPMN process and of course send a welcome mail as introducton ;)

To get started with this project make sure you have the following accounts:

- Google Account for your Firebase project
- Sendgrid Account to send mails without maintaining a mai service
- Giphy API accunt to search for appropriate gifs for you.
- Cloud environment like AWS or Digital Ocean to deploy the shop frontend.

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
