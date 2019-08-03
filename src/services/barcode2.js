const password = 'applesarehealthy';
const username = 'RESTUser';
function getBarcode(body) {
  return fetch(`/barcode/${body.codeResult.code}`, {
    method:'POST',
    body: JSON.stringify({ ...body }),
    headers: {
      "Access-Control-Allow-Origin": "*",
      'Authorization': 'Basic ' + Buffer.from(username + ":" + password).toString('base64'),
      'Access-Control-Allow-Credentials': 'true'
    },
  });
}

export {
  getBarcode
};
