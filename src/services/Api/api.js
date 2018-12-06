/**
 * The main API handler. All requests to the API will go via this function. If an endpoint requires
 * authorization, and the current Access Token has expired, then we attempt to refresh the token
 * and then re-run the original request.
 */
const axios = require('axios');

/**
 * Send a request to the API defined here.
 * @param {string} method is the HTTP method to use, eg. GET or POST
 * @param {string} endpoint is where the request is sent to, eg. /news/
 * @param {object} [data] is the optional message payload object, eg. {"something": 123}
 * @param {object} [headers] the optional extra request headers, eg. {"User": 123, "Authorization": "abc"}
 */
const callApi = async (method, endpoint, data, headers) => {
  const baseUrl = 'https://vortechmusic.com/api/1.0';
  // const baseUrl = 'http://localhost:5000/api/1.0';
  const url = baseUrl + endpoint;

  try {
    return await axios({
      method: method.toLowerCase(),
      url,
      data,
      headers,
    });
  } catch (err) {
    if (err.response.status === 401) {
      attemptRefresh(baseUrl);
      return retry(method, url, data, headers);
    }
    throw err;
  }
};

/**
 * Call the Refresh token endpoint in the API and update the current Access Token if possible.
 * @param {string} baseUrl is the API base url, eg. https://vortechmusic.com/api/1.0/
 */
const attemptRefresh = async (baseUrl) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${baseUrl}/refresh/`,
      data: null,
      headers: {
        'User': localStorage.getItem('userID'),
        'Authorization': localStorage.getItem('refreshToken')
      }
    });
    localStorage.setItem('accessToken', response.data.accessToken);
  } catch (err) {
    return err;
  }
};

/**
 * Retry the initial request again with the possibly updated Access Token. If no new token could be
 * retrieved, this will simply return the same 401 Unauthorized, which is then passed on to the
 * view that did the request.
 * @param {string} method is the HTTP method to use, eg. GET or POST
 * @param {string} url is the full URL where the request is sent to, eg. https://vortechmusic.com/api/1.0/
 * @param {object} [data] is the optional message payload object, eg. {"something": 123}
 * @param {object} [headers] the optional extra request headers, eg. {"User": 123, "Authorization": "abc"}
 */
const retry = async (method, url, data, headers) => {
  await axios({
    method: method.toLowerCase(),
    url: url,
    data: data,
    headers: headers
  });
};

module.exports = callApi;
