const fetch = require("node-fetch");
const password = 'applesarehealthy';
const username = 'RESTUser';
function getBarcode(body) {
  return fetch(`https://ven02153.service-now.com/api/nuvo/fuel_planner/barcode`, {
  //return fetch(`/barcode`, {
    method:'POST',
    body: JSON.stringify(body),
    headers: {
      "Access-Control-Allow-Origin": "*",
      'Authorization': 'Basic ' + Buffer.from(username + ":" + password).toString('base64'),
      'Access-Control-Allow-Credentials': 'true'
    },
  });
}

exports.default = {
  getBarcode: getBarcode
}
