# Order process with zeebe and Camunda Cloud

So you want to play with Zeebe? I have a very good use case for it from my point of view. And exactly for this reason this project was born. In September 2019 Camunda Cloud was presented at the CamundaCon. This makes the execution of processes even easier, because the engine is now offered as a SaaS. If you want to learn more about this, I recommend the following readings:

- Mike [introduces Camunda Cloud](https://zeebe.io/blog/2019/09/announcing-camunda-cloud/)
- Bernd Rücker as one of the founders gives [a first impression of the offer.](https://blog.bernd-ruecker.com/camunda-cloud-the-why-the-what-and-the-how-8198f0a8c33b)
- A [Getting Started](https://zeebe.io/blog/2019/09/getting-started-camunda-cloud/) by Josh

## No hurdle to get started

From my own experience I know what it means to build order processes. Executable workflows offer two major advantages: software is no longer written exclusively with code, and the notation serves documentation that business people can easily understand. However, in the past we always had to take care of much more than just our own business logic - but with the rise of more and more SaaS offerings, the cloud and the serverless approach we finally have more time to deal with the actual issues.

Here I would like to show how easy it is to model, deploy and execute a workflows (that is admittedly very simple). Services are orchestrated that are provisioned as serverless functions on Google Firebase and other services like the Giphy API and the Sendgrid API for sending emails. The serverless functions are secured by OAuth tokens that are received during process execution.

A really very simple shop application starts an order process for a logged-in user. I've tried to use only services that have a free tier, so you can easily run the examples yourself. Of course you are free to fork and make your own customizations ;)

In summary, you need an account for the following services:

- CamundaCloud
- Auth0
- Google Firebase
- Giphy (optional)
- SendGrid (optional)
- DigitalOcean (optional)

Enough writing. Let's hack!

## Some insights

### The order process

The order process consists of a few nodes, a few gateways, and a few end nodes, each of which indicates the reason for the completion. Zeebe workflows are modeled with the Zeebe Modeler. So far it has only been usable as a standalone desktop application:

![order process](./assets/order-process.png)

As already mentioned, it is a very simple workflow, but it should clarify how the Zeebe Engine can be used as SaaS:

- At the beginning, a token is requested for the process, which is then passed as JSON web tokens to the Firebase functions for authentication in the following steps.
- The CamundaCloud comes with a ready-to-use http worker so that service calls can be configured very easily. Necessary parameters, so-called worker variables, can be configured in the Cloud Console, which can be set in Service Tasks in the form `${variableName}`. This can be seen in any node.
- Unfortunately process variables cannot be set as header information of an http call until now. For this reason the token is not passed in the header but in the body.
- Parallel paths are possible, to see when checking the payment data and sending the welcome mail.



### Vorbereitung in der Cloud Console

Bevor du anfangen kannst einen Prozess zu deployen bzw. eine Instanz zu starten brauchst du einen Cluster. Lege über die Console ein und lege einen neuen Cluster an.

#### Worker Variablen

Lege die folgenden Worker Variablen an, die später von den Workern verarbeitet werden:

- `firebase-base-url`: die base URL erhältst du über die das Firebase Dashboard und wird in etwa so aussehen: `https://us-central1-${firebase-project}.cloudfunctions.net/app`
- `giphy-api-key`: mit dem API Key kann der Prozess über die Gipy API ein zufälliges Gif suchen
- `sendgrid-api-key`: Voraussetzung, um über SendGrid EMails zu verschicken.
- `auth-url`: OAuth URL, über die der Prozess ein Token anfragen kann: `https://[project].auth0.com/oauth/token`

#### Client anlegen

Um von außen mit dem Zeebe Broken interagieren zu können braucht ein Client ein gültiges Token. Das Token wird ausgestellt mit gültigen Client Credentials. Dafür musst du lediglich einen Client in der Console anlegen.

#### Auth0, Firebase, SendGrid, Giphy

Diese Dienste werden in diesem Use Case genutzt (wir wollen uns schließlich um unsere Business Logic kümmern und keine Kernkompetenz aufbauen bei Themen wie Identität oder E-Mailing):

- Auth0: Identity Provider für den Shop und die Auftragsprozesse. Lege einen Account und zwei Applikationen an: eine Webapplikation und eine Machine-2-Machine Applikation
- Firebase: Compute Infrastruktur - lege ein Functions Projekt an.
- SendGrid: E-Mail Dienst - Account anlegen und einen API-Key erzeugen
- Giphy: Gif Datenbank - Registrieren und API-Key für die REST-API holen

#### Umgebungsvariablen

Die folgenden Umgebungsvariablen enthalten Infos, die nicht ins Repo gehören, die aber unser Setup benötigt, damit es funktioniert (OPZ steht hier für **o**rder-**p**rocess-**z**eebe):

- `OPZ_CLIENT_ID`: OAuth Client  oauth client id of m2m app in auth0
- `OPZ_CLIENT_SECRET`: oauth client secret of m2m app in auth0
- `OPZ_AUDIENCE`: audience of m2m app in auth0
- `CC_CLUSTER_UUID`: cluster uuid in camunda cloud
- `CC_BASE_URL`: base url to connect to camunda cloud
- `CC_CLIENT_ID`: created client id of camunda cloud cluster
- `CC_CLIENT_SECRET`: corresponding secret of client
- `CC_AUTH_URL`: oauth url to get access tokens


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
