import * as ZB from "zeebe-node";
import * as dotenv from "dotenv";

dotenv.config();

const clusterId = process.env.CC_CLUSTER_UUID;
const baseUrl = process.env.CC_BASE_URL;
const audience = clusterId + "." + baseUrl;
const clientId = process.env.CC_CLIENT_ID;
const clientSecret = process.env.CC_CLIENT_SECRET;
const authUrl = process.env.CC_AUTH_URL;

const WORKFLOW_ID = "order-process";

export class WorkflowController {
  private zeebeClient;

  constructor() {}

  public async setup() {
    this.zeebeClient = new ZB.ZBClient(`${clusterId}.${baseUrl}:443`, {
      oAuth: {
        url: authUrl,
        audience,
        clientId,
        clientSecret,
        cacheOnDisk: true
      }
    });
  }

  public async startWorkflow(data) {
    console.log(`starting workflow instance`);
    const result = await this.zeebeClient.createWorkflowInstance(
      WORKFLOW_ID,
      data
    );
    console.log(result);
    return result;
  }
}
