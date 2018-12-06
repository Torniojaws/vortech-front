import React from 'react';
import LoginForm from './components/LoginForm/LoginForm.jsx';
import callApi from '@/services/Api/api.js';

/**
 * This handles the logic related to the Login area. If user is not logged in, we show options for
 * login and register. Otherwise the user profile page link. etc.
 */
class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      loggedIn: false
    };
    this.checkLogin();
  }

  /**
   * When the page is loaded, we check whether the user's access token is still valid, and update
   * if needed. There is a chance to have a 401 if the page is kept open longer than 1 hour.
   */
  async checkLogin () {
    const payload = {
      id: localStorage.userID || '',
      access_token: localStorage.accessToken || '',
      refresh_token: localStorage.refreshToken || '',
    };
    try {
      const response = await callApi('POST', '/login/check/', payload, null);
      this.handleResponse(response);
    } catch (err) {
      // This will be 4xx when login details are invalid or empty (guest, not logged in, or invalid)
      // In any case, the result is the same - the user must login.
      this.setState({ loggedIn: false });
    }
  }

  /**
   * When we received a non-error response from login check, we handle the login state and token
   * @param {object} response contains the response to the login check request
   */
  handleResponse (response) {
    if (response.status === 200) {
      // Old valid accessToken expired and we received a new one
      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
      }
      this.setState({ loggedIn: true });
    } else {
      this.setState({ loggedIn: false });
    }
  }

  render () {
    // Doing this way to prevent the login form for appearing on/off constantly
    if (this.state.loggedIn === false) {
      return <blockquote><LoginForm /></blockquote>;
    } else {
      return (
        <section>
          <a href='/profile'>View my profile</a><br />
          <a href='/logout'>Logout</a>
        </section>
      );
    }
  }
}

export default Login;
