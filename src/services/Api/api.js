/**
 * It gets hard to implement this reliably as a component, so let's do it as a standalone function.
 */
let axios = require('axios');

function callApi(method, endpoint, params) {
    let baseUrl = "http://localhost:5000/api/1.0";
    let url = baseUrl + endpoint;

    switch (method.toLowerCase()) {
        case "get":
            return axios.get(url, params);
        case "post":
            return axios.post(url, params);
        case "put":
            return axios.put(url, params);
        case "patch":
            return axios.patch(url, params);
        case "delete":
            return axios.delete(url, params);
        default:
            return "Unknown method!";
    }
}

module.exports = callApi;
