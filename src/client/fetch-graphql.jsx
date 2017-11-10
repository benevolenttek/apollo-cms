/**
 * Run a GraphQL Query using isomorphic-fetch
 */

const HTTP_BAD_REQUEST = 400
const endpoint = "https://api.graph.cool/simple/v1/cj9g48vlm79hy0120m4tvigm9"

let fetchGraphQLCache = [];

export default (query, callback) => {

  for (let c of fetchGraphQLCache) {
    if (c[0] === query) {
      callback(c[1])
      return
    }
  }

  let queryFormatted = query.replace(/\n/g, '\\n').replace(/\t/g, '\\t').replace(/"/g, '\\"').replace(/ /g, '')

  fetch(endpoint, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      // "x-csrf-jwt": token
    },
    body: `{"query":"{` + queryFormatted + `}"}`
  })
    .then((response) => {
      if (response.status >= HTTP_BAD_REQUEST) {
        throw new Error("Bad response from server");
      }
      response.json().then((res) => {
        fetchGraphQLCache.push([query,res.data])
        callback(res.data);
      });
    })
    .catch((err) => {
      throw new Error("Error Fetching Records", err);
    });
}
