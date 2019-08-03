const fetch = require("node-fetch");
const password = 'applesarehealthy';
const username = 'RESTUser';
function getAllPantries() {
  //return fetch(`https://ven02153.service-now.com/api/nuvo/fuel_planner/pantry/all`, {
  return fetch(`/receipes`, {
    method:'GET',
    headers: {
      "Access-Control-Allow-Origin": "*",
      'Authorization': 'Basic ' + Buffer.from(username + ":" + password).toString('base64'),
      'Access-Control-Allow-Credentials': 'true'
    },
  });
}

exports.default = {
  getAllPantries: getAllPantries
}
