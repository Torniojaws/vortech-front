import React from 'react';
import {render} from 'react-dom';

import callApi from '../../services/Api/api.js';

/**
 * This handles the logic related to logging out. Generally you'll only end up here when logging
 * out, but we'll show a link to the login page if you go here without being logged in.
 */
class Logout extends React.Component {
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

    componentDidMount() {
        if (this.state.loggedIn) {
            let config = {'Authorization': localStorage.accessToken, 'User': localStorage.userID};
            let promise = callApi("POST", "/logout/", null, {'headers': config});

            promise.then(res => {
                if (res.data.success === true) {
                    // Logout was successful, let's clear the session since the accessToken is now
                    // invalid (enforced by the backend).
                    localStorage.clear();
                    // And return home
                    window.location.href = "/";
                } else {
                    console.log("Something strange in the neighbourhood...");
                }
            })
            .catch(error => {
                console.log("Request failed with:\n" + error);
            })
        }
    }

    /**
     * This is used to check whether the user is logged in. We just need to know if there is an
     * accessToken. Without it (plus it being valid - checked by the backend), you cannot access
     * authenticated endpoints anyway.
     * @return {boolean}
     */
    isLogged() {
        return localStorage.hasOwnProperty("accessToken");
    }

    render() {
        if (this.state.loggedIn === false) {
            return (
                <section>
                    <p>You are already logged out.</p>
                    <a href="/login">Login here</a>
                </section>
            );
        } else {
            return null;
        }
    }
}

export default Logout;
