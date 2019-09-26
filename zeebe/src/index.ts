import { Workflow } from "./workflow/workflow";
import * as dotenv from "dotenv";

dotenv.config();

const workflow = new Workflow();

const orderEnvelope = {
  id: "123",
  customer: {
    name: "Adam",
    email: "i@adamurban.de"
  },
  templateId: "d-322370cfd92e48888453509bf201a3c6"
};

workflow.setup().then(() => {
  workflow.deployWorkflow().then(() => {
    workflow.startWorkflow(orderEnvelope);
  });
  //   workflow.showTopology().then(() => {
  //   });
});
