const password = 'applesarehealthy';
const username = 'RESTUser';
function getGroceryList(body) {
  return fetch(`https://ven02153.service-now.com/api/nuvo/fuel_planner/groceries/list`, {
  //return fetch(`/groceries`, {
    method:'POST',
    body: JSON.stringify(body),
    headers: {
      "Access-Control-Allow-Origin": "*",
      'Authorization': 'Basic ' + Buffer.from(username + ":" + password).toString('base64'),
      'Access-Control-Allow-Credentials': 'true',
      'Content-Type': 'application/json'
    },
  });
}

export {
  getGroceryList
};
