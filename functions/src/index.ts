import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

exports.riskPreventionCheck = functions.https.onRequest((request, response) => {
    const name = request.body.name;
    const id = request.body.id;

    let result;

    if (name === 'Donald Duck') {
        result = {id, score: 0};
    } else {
        result = {id, score: 100};
    }

    response.send(result);
});
