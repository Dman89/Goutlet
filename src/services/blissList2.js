const fetch = require("node-fetch");
const password = 'applesarehealthy';
const username = 'RESTUser';
function getAllBlissLists() {

  var body = JSON.stringify({
    orderBy: 'sys_created_on',
    fields: [
      { label: 'short_description' }, { label: 'u_wishlist' }, { label: 'u_default' }, { label: 'sys_id' }, 
    ]
  });

  return fetch(`https://ven02153.service-now.com/api/nuvo/fuel_planner/bliss/list/fetch`, {
  //return fetch(`/receipes`, {
    method:'POST',
    body: body,
    headers: {
      "Access-Control-Allow-Origin": "*",
      'Authorization': 'Basic ' + Buffer.from(username + ":" + password).toString('base64'),
      'Access-Control-Allow-Credentials': 'true',
      'Content-Type': 'application/json'
    }
  });
}

export {
    getAllBlissLists
}
