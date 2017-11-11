/**
 * It gets hard to implement this reliably as a component, so let's do it as a standalone function.
 */
let axios = require('axios');

function callApi(method, endpoint, params, headers) {
    let baseUrl = "https://212.24.107.55/api/1.0";
    let url = baseUrl + endpoint;

    switch (method.toLowerCase()) {
        case "get":
            return axios.get(url, params, headers);
        case "post":
            return axios.post(url, params, headers);
        case "put":
            return axios.put(url, params, headers);
        case "patch":
            return axios.patch(url, params, headers);
        case "delete":
            return axios.delete(url, params, headers);
        default:
            return "Unknown method!";
    }
}

module.exports = callApi;
