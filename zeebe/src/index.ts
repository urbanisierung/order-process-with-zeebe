import { Workflow } from './workflow/workflow';
import * as dotenv from 'dotenv';

dotenv.config();

const workflow = new Workflow();

workflow.setup().then(() => {
    workflow.showTopology().then(() => {
        workflow.deployWorkflow().then(() => {
            workflow.startWorkflow();
        })
    });
});
