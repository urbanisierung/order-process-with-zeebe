import { WorkflowController } from "./workflow.controller";
import { v4 } from "uuid";

export class OrderController {
  private workflowController = new WorkflowController();

  constructor() {
    this.workflowController.setup();
  }

  public async placeOrder(customer) {
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
        name: customer.name,
        email: customer.email
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

    const result = await this.workflowController.startWorkflow(payload);
    return result;
  }
}
