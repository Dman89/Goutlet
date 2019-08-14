const fetch = require("node-fetch");
const password = 'applesarehealthy';
const username = 'RESTUser';
function getAllBlissLists() {
  return fetch(`https://ven02153.service-now.com/api/nuvo/fuel_planner/bliss/list/fetch`, {
  //return fetch(`/receipes`, {
    method:'POST',
    body: JSON.stringify({
      orderBy: 'short_description'
    }),
    headers: {
      "Access-Control-Allow-Origin": "*",
      'Authorization': 'Basic ' + Buffer.from(username + ":" + password).toString('base64'),
      'Access-Control-Allow-Credentials': 'true',
      'Content-Type': 'application/json'
    }
  });
}

exports.default = {
    getAllBlissLists: getAllBlissLists
}
