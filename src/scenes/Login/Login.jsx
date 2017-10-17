import React from 'react';
import {render} from 'react-dom';

import LoginForm from './components/LoginForm/LoginForm.jsx';

/**
 * This handles the logic related to the Login area. If user is not logged in, we show options for
 * login and register. Otherwise the user profile page link. etc.
 */
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        }
        this.isLogged = this.isLogged.bind(this);
    }

    componentWillMount() {
        this.setState({
            loggedIn: this.isLogged()
        })
    }

    /**
     * This is used to check whether the user has logged in successfully
     * @return {boolean}
     */
    isLogged() {
        return localStorage.hasOwnProperty("loggedIn");
    }

    render() {
        if (this.state.loggedIn) {
            return <a href="/profile">View my profile</a>;
        } else {
            return <LoginForm />;
        }
    }
}

export default Login;
