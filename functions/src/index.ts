import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
// tslint:disable-next-line: no-duplicate-imports
import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");

admin.initializeApp();

const app = express();

// verifies JSON webtoken
// since process variables currently cannot be passed as request header
// the auth token is passed within the body
function verification(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const token = request.body.token.access_token;
  jwt.verify(token, `${functions.config().auth.secret}`, function(
    err: any,
    decoded: any
  ) {
    if (err) {
      console.log(`Error verifying token: ${err}`);
      response.status(401).json(err);
    }
    console.log("successfully verified!");
    next();
  });
}

// audit function to log messages incl passed time to console
function audit(request: Request, response: Response, next: NextFunction) {
  const id = request.body.id;
  const name = request.url;
  const creationTime = request.body.creationTime;
  const now = new Date().getTime();
  const timesPassed = now - creationTime;
  const value = `${id}:${name} / created: ${creationTime} / time passed: ${timesPassed}`;
  console.log(value);
  next();
}

// for each request write audit log and verify access token
app.use(audit);
app.use(verification);

// dummy endpoint to fulfill risk prevention check for order
app.post("/risk-prevention", (request, response) => {
  const name = request.body.customer.name;

  let result;

  if (name === "Donald Duck") {
    result = { score: 0 };
  } else {
    result = { score: 100 };
  }

  response.send(result);
});

// endpoint to prepare data for welcome mail
app.post("/customer-interaction/welcome-mail-data", (request, response) => {
  const giphyResponse = request.body.giphyResponse;
  const customer = request.body.customer;
  const templateId = request.body.meta.welcomeMailTemplateId;

  const templateData = {
    welcomeMail: {
      from: {
        email: "bob@mighty-orderings.com"
      },
      personalizations: [
        {
          to: [
            {
              email: customer.email
            }
          ],
          dynamic_template_data: {
            name: customer.name,
            url: giphyResponse[0].embed_url
          }
        }
      ],
      template_id: templateId
    }
  };
  response.send(templateData);
});

// dummy endpoint to validate order
app.post("/order/check", (request, response) => {
  if (!request.body.customer) {
    response.send({ valid: false, reasonId: 1 });
  }
  if (!request.body.orderEnvelope.orderLines) {
    response.send({ valid: false, reasonId: 2 });
  }
  if (request.body.orderEnvelope.orderLines.length === 0) {
    response.send({ valid: false, reasonId: 3 });
  }
  response.send({ valid: true, reasonId: 0 });
});

// dummy endpoint to check if bank transfer was successful
app.post("/payment/bank-transfer", (request, response) => {
  response.send({ bankTransferSuccessful: true });
});

// dummy endpoint to pass order lines
app.post("/logistics/ship", (request, response) => {
  response.send();
});

// rest endpoint to write audit logs
app.post("/audit", (request, response) => {
  const id = request.body.id;
  const name = request.query.name;
  const creationTime = request.body.creationTime;
  const now = new Date().getTime();
  const timesPassed = now - creationTime;
  const value = `${id}:${name} / created: ${creationTime} / time passed: ${timesPassed}`;
  console.log(value);
});

exports.app = functions.https.onRequest(app);
