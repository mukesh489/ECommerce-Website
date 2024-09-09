import paytmchecksum from '../paytm/PaytmChecksum.js';
import { paytmParams, paytmMerchantkey } from '../index.js';
import formidable from 'formidable';
import https from 'https';

export const addPaymentGateway = async (request, response) => {
    try {
        const paytmCheckSum = await paytmchecksum.generateSignature(paytmParams, paytmMerchantkey);
        const params = {
            ...paytmParams,
            'CHECKSUMHASH': paytmCheckSum
        };
        response.json(params);
    } catch (error) {
        console.log('Error in addPaymentGateway:', error.message);
        response.status(500).json({ error: error.message });
    }
};

export const paymentResponse = (request, response) => {
    const form = new formidable.IncomingForm();
    const paytmCheckSum = request.body.CHECKSUMHASH;
    delete request.body.CHECKSUMHASH;

    paytmchecksum.verifySignature(request.body, paytmMerchantkey, paytmCheckSum)
        .then(isVerifySignature => {
            if (isVerifySignature) {
                let paytmParams = {
                    "MID": request.body.MID,
                    "ORDERID": request.body.ORDERID
                };

                paytmchecksum.generateSignature(paytmParams, paytmMerchantkey).then(checksum => {
                    paytmParams["CHECKSUMHASH"] = checksum;

                    const post_data = JSON.stringify(paytmParams);

                    const options = {
                        hostname: 'securegw-stage.paytm.in',
                        port: 443,
                        path: '/order/status',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Content-Length': post_data.length
                        }
                    };

                    let res = "";
                    const post_req = https.request(options, post_res => {
                        post_res.on('data', chunk => {
                            res += chunk;
                        });

                        post_res.on('end', () => {
                            let result = JSON.parse(res);
                            console.log(result);
                            response.redirect(`http://localhost:3000/`);
                        });
                    });
                    post_req.write(post_data);
                    post_req.end();
                });
            } else {
                console.log("Checksum Mismatched");
                response.status(400).json({ error: 'Checksum Mismatched' });
            }
        })
        .catch(error => {
            console.log('Error in paymentResponse:', error.message);
            response.status(500).json({ error: error.message });
        });
};
