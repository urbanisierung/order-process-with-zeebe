import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// import { Logging } from '@google-cloud/logging';

admin.initializeApp();
// const logging = new Logging();
// const log = logging.log('order-process-with-zeebe');

// const METADATA = {
//     resource: {
//       type: 'cloud_function',
//       labels: {
//         function_name: 'order-audit',
//         region: 'us-central1'
//       }
//     }
//   };

exports.riskPreventionCheck = functions.https.onRequest((request, response) => {
    const name = request.body.customer.name;
    const id = request.body.id;
    const orderCreatedAt = request.body.orderCreatedAt;
    audit(id, 'riskPreventionCheck', orderCreatedAt);

    let result;

    if (name === 'Donald Duck') {
        result = {id, score: 0};
    } else {
        result = {id, score: 100};
    }

    response.send(result);
});

exports.getGifUrl = functions.https.onRequest((request, response) => {
    const data = request.body.data;
    const embedUrl = data[0].embed_url;
    response.send({url: embedUrl});
});

exports.prepareMailData = functions.https.onRequest((request, response) => {
    const data = request.body.data;
    const customer = request.body.customer;
    const templateId = request.body.templateId;

    const templateData = {
        from: {
            email: 'bob@mighty-orderings.com'
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
    }
    response.send(templateData);
});

exports.orderValidationCheck = functions.https.onRequest((request, response) => {
    const id = request.body.id;
    const orderCreatedAt = request.body.orderCreatedAt;
    audit(id, 'orderValidationCheck', orderCreatedAt);

    if (!request.body.customer) {
        response.send({valid: false, reasonId: 1});
    }
    if (!request.body.orderLines) {
        response.send({valid: false, reasonId: 2});
    }
    if (request.body.orderLines.length === 0) {
        response.send({valid: false, reasonId: 3});
    }
    response.send({valid: true, reasonId: 0});
});

exports.bankTransferSuccessful = functions.https.onRequest((request, response) => {
    const id = request.body.id;
    const orderCreatedAt = request.body.orderCreatedAt;
    audit(id, 'bankTransferSuccessful', orderCreatedAt);
    response.send({bankTransferSuccessful: true});
});

exports.shipOrderlines = functions.https.onRequest((request, response) => {
    const id = request.body.id;
    const orderCreatedAt = request.body.orderCreatedAt;
    audit(id, 'shipOrderlines', orderCreatedAt);
    response.send();
});

exports.audit = functions.https.onRequest((request, response) => {
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
    // const data = {
    //     event: `${id}:${name}`,
    //     value: `created: ${created} / time passed: ${timesPassed}`
    // };
    // const entry = log.entry(METADATA, data);
    // const prom = log.write(entry);
    // prom.resolve();
}