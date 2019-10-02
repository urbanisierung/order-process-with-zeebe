import * as dotenv from "dotenv";
import { v4 } from "uuid";
import { Workflow } from "./workflow/workflow";

dotenv.config();

const workflow = new Workflow();

const payload = {
  id: v4(),
  creationTime: new Date().getTime(),
  oauth: {
    client_id: process.env.OPZ_CLIENT_ID,
    client_secret: process.env.OPZ_CLIENT_SECRET,
    audience: process.env.OPZ_AUDIENCE,
    grant_type: "client_credentials"
  },
  customer: {
    name: "Adam",
    email: "i@adamurban.de"
  },
  orderEnvelope: {
    payment: {
      method: "banktransfer"
    },
    orderLines: [
      {
        id: 42,
        name: "time machine",
        count: 1,
        price: "3500€"
      },
      {
        id: 17,
        name: "traditional bag for time machine",
        count: 1,
        price: "25€"
      }
    ]
  },
  meta: {
    welcomeMailTemplateId: "d-322370cfd92e48888453509bf201a3c6"
  }
};

workflow.setup().then(() => {
  workflow.deployWorkflow().then(() => {
    workflow.startWorkflow(payload);
  });
});
