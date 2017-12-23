/**
 * The main API handler. All requests to the API will go via this function. If an endpoint requires
 * authorization, and the current Access Token has expired, then we attempt to refresh the token
 * and then re-run the original request.
 */
let axios = require('axios');

/**
 * Send a request to the API defined here.
 * @param {string} method is the HTTP method to use, eg. GET or POST
 * @param {string} endpoint is where the request is sent to, eg. /news/
 * @param {object} [data] is the optional message payload object, eg. {"something": 123}
 * @param {object} [headers] the optional extra request headers, eg. {"User": 123, "Authorization": "abc"}
 */
function callApi(method, endpoint, data, headers) {
    let baseUrl = "https://vortechmusic.com/api/1.0";
    let url = baseUrl + endpoint;

    let response = axios({
        method: method.toLowerCase(),
        url: url,
        data: data,
        headers: headers
    });

    response.then(res => {
        // Do nothing, we return later on if no error happens
    })
    .catch(err => {
        // If a 401 is returned, we do:
        // POST /refresh/
        // {"User": 123, "Authorization": "abc"}
        // And then retry the initial request
        if (err.response.status === 401) {
            attemptRefresh(baseUrl);
            let retryResponse = retry(method, url, data, headers);
            return retryResponse;
        }
    })

    return response;
}

/**
 * Call the Refresh token endpoint in the API and update the current Access Token if possible.
 * @param {string} baseUrl is the API base url, eg. https://vortechmusic.com/api/1.0/
 */
function attemptRefresh(baseUrl) {
    let response = axios({
        method: "post",
        url: baseUrl + "/refresh/",
        data: null,
        headers: {
            "User": localStorage.getItem("userID"),
            "Authorization": localStorage.getItem("refreshToken")
        }
    });

    response.then(res => {
        localStorage.setItem("accessToken", res.data.accessToken);
    })
    .catch(err => {
        console.log(err);
    })
}

/**
 * Retry the initial request again with the possibly updated Access Token. If no new token could be
 * retrieved, this will simply return the same 401 Unauthorized, which is then passed on to the
 * view that did the request.
 * @param {string} method is the HTTP method to use, eg. GET or POST
 * @param {string} url is the full URL where the request is sent to, eg. https://vortechmusic.com/api/1.0/
 * @param {object} [data] is the optional message payload object, eg. {"something": 123}
 * @param {object} [headers] the optional extra request headers, eg. {"User": 123, "Authorization": "abc"}
 */
function retry(method, url, data, headers) {
    let response = axios({
        method: method.toLowerCase(),
        url: url,
        data: data,
        headers: headers
    });

    response.then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    })

    return response;
}

module.exports = callApi;
