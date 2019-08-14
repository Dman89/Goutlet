const fetch = require("node-fetch");
const password = 'applesarehealthy';
const username = 'RESTUser';
function createBlissTreat() {

  var body = JSON.stringify({
    newRecord: true,
    table: 'u_fp_receipe',
    record: "72aa32aedb523300945727ba4b961958",
    short_description: 'Default Title',
    parent: '7d05e9b3dbcbf30038bb2f625b961986'
  });

  return fetch(`https://ven02153.service-now.com/api/nuvo/fuel_planner/bliss/treat/insert`, {
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
    createBlissTreat
}


// TODO Fix the Current table issue
// TAble = Bliss Treat
// Table to link the record to is called
// Table = FP Receipe