import React from 'react';
import callApi from '@/services/Api/api.js';

/**
 * This handles the logic related to logging out. Generally you'll only end up here when logging
 * out, but we'll show a link to the login page if you go here without being logged in.
 */
class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: localStorage.hasOwnProperty('accessToken')
    };
  }

  async componentDidMount() {
    if (this.state.loggedIn) {
      const headers = {
        'Authorization': localStorage.accessToken,
        'User': localStorage.userID
      };
      try {
        const response = await callApi('POST', '/logout/', null, headers);
        if (response.data.success === true) {
          // Logout was successful, let's clear the session since the accessToken is now
          // invalid (enforced by the backend).
          localStorage.clear();
          // And return home
          window.location.href = '/';
        }
      } catch (err) {
        return;
      }
    }
    return;
  }

  render() {
    if (this.state.loggedIn === false) {
      return (
        <section>
          <p>You are already logged out.</p>
          <a href='/login'>Login here</a>
        </section>
      );
    } else {
      return null;
    }
  }
}

export default Logout;
