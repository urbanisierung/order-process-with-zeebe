import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
// tslint:disable-next-line: no-duplicate-imports
import { Request, Response, NextFunction } from "express";

admin.initializeApp();

const app = express();

function verification(request: Request, response: Response, next: NextFunction) {
  const jwt = require('jsonwebtoken');
  const token = request.body.access_token;
  console.log(token);
  jwt.verify(token, `${functions.config().auth.secret}`, function(err: any, decoded: any) {
    if (err) {
      console.log(`Error verifying token: ${err}`);
      response.status(500).json(err);
    }
    console.log('successfully verified!');
    next();
  });

};

app.post("/token", (request, response) => {
  const id = request.body.id;
  const orderCreatedAt = request.body.orderCreatedAt;
  audit(id, "token", orderCreatedAt);

  admin
    .auth()
    .createCustomToken(id)
    .then(customToken => {
      response.status(201).send({ authorization: `Bearer ${customToken}` });
    })
    .catch(error => {
      console.log(`Error creating custom token: ${error}`);
      response.status(500).json(error);
    });
});

app.use(verification);

app.post("/risk-prevention", (request, response) => {
  const name = request.body.customer.name;
  const id = request.body.id;
  const orderCreatedAt = request.body.orderCreatedAt;
  audit(id, "/risk-prevention", orderCreatedAt);

  let result;

  if (name === "Donald Duck") {
    result = { id, score: 0 };
  } else {
    result = { id, score: 100 };
  }

  response.send(result);
});

app.post("/meta/gif", (request, response) => {
  const data = request.body.data;
  const embedUrl = data[0].embed_url;
  response.send({ url: embedUrl });
});

app.post("/customer-interaction/data", (request, response) => {
  const data = request.body.data;
  const customer = request.body.customer;
  const templateId = request.body.templateId;
  const id = request.body.id;
  const orderCreatedAt = request.body.orderCreatedAt;
  audit(id, "/customer-interaction/data", orderCreatedAt);

  const templateData = {
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
          url: data[0].embed_url
        }
      }
    ],
    template_id: templateId
  };
  response.send(templateData);
});

app.post("/order/check", (request, response) => {
  const id = request.body.id;
  const orderCreatedAt = request.body.orderCreatedAt;
  audit(id, "/order/check", orderCreatedAt);

  if (!request.body.customer) {
    response.send({ valid: false, reasonId: 1 });
  }
  if (!request.body.orderLines) {
    response.send({ valid: false, reasonId: 2 });
  }
  if (request.body.orderLines.length === 0) {
    response.send({ valid: false, reasonId: 3 });
  }
  response.send({ valid: true, reasonId: 0 });
});

app.post("/payment/bank-transfer", (request, response) => {
  const id = request.body.id;
  const orderCreatedAt = request.body.orderCreatedAt;
  audit(id, "/payment/bank-transfer", orderCreatedAt);
  response.send({ bankTransferSuccessful: true });
});

app.post("/logistics/ship", (request, response) => {
  const id = request.body.id;
  const orderCreatedAt = request.body.orderCreatedAt;
  audit(id, "/logistics/ship", orderCreatedAt);
  response.send();
});

app.post("/audit", (request, response) => {
  const id = request.body.id;
  const name = request.query.name;
  const orderCreatedAt = request.body.orderCreatedAt;
  audit(id, name, orderCreatedAt);
});

function audit(id: string, name: string, created: number) {
  const now = new Date().getTime();
  const timesPassed = now - created;
  const value = `${id}:${name} / created: ${created} / time passed: ${timesPassed}`;
  console.log(value);
}

exports.app = functions.https.onRequest(app);
