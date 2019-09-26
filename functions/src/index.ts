import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

exports.riskPreventionCheck = functions.https.onRequest((request, response) => {
    const name = request.body.customer.name;
    const id = request.body.id;

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