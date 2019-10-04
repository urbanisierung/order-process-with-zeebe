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
