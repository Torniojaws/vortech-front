/**
 * It gets hard to implement this reliably as a component, so let's do it as a standalone function.
 */
let axios = require('axios');

function callApi(method, endpoint, data, headers) {
    let baseUrl = "https://vortechmusic.com/api/1.0";
    let url = baseUrl + endpoint;

    return axios({
        method: method.toLowerCase(),
        url: url,
        data: data,
        headers: headers
    });
}

module.exports = callApi;
