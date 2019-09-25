import * as ZB from "zeebe-node";

dotenv.config();

const clusterId = process.env.CC_CLUSTER_UUID;
const baseUrl = process.env.CC_BASE_URL;
const audience = clusterId + "." + baseUrl;
const clientId = process.env.CC_CLIENT_ID;
const clientSecret = process.env.CC_CLIENT_SECRET;
const authUrl = process.env.CC_AUTH_URL;

const WORKFLOW = '../assets/order-process.bpmn';

export class Workflow {
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
    // this.zeebeClient = new ZB.ZBClient(`localhost:26500`);
  }

  public async showTopology() {
    console.log(`fetching topology`);
    const topology = await this.zeebeClient.topology();
    console.log(JSON.stringify(topology, null, 2));
  }

  public async startWorkflow() {
    console.log(`starting workflow instance`);
    const result = await this.zeebeClient.createWorkflowInstance(
      "createGithubIssue",
      {
        title: "issue title"
      }
    );
    console.log(result);
  }

  public async deployWorkflow() {
    console.log(`deploying workflow instance`);
    const result = await this.zeebeClient.deployWorkflow(
      `${__dirname}/${WORKFLOW}`
    );
    console.log(JSON.stringify(result));
  }
}
