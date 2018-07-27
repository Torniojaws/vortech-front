import React from 'react';

import LoginForm from './components/LoginForm/LoginForm.jsx';

/**
 * This handles the logic related to the Login area. If user is not logged in, we show options for
 * login and register. Otherwise the user profile page link. etc.
 */
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: localStorage.hasOwnProperty("accessToken")
    };
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <section>
          <a href='/profile'>View my profile</a><br />
          <a href='/logout'>Logout</a>
        </section>
      );
    } else {
      return <blockquote><LoginForm /></blockquote>;
    }
  }
}

export default Login;
