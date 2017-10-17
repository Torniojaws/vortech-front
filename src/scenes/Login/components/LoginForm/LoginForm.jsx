import React from 'react';
import {render} from 'react-dom';

import axios from 'axios';

/**
 * This is the form where you can login as a user, to access features only users (or admin) can do.
 */
class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.receiveResponse = this.receiveResponse.bind(this);
    }

    /**
     * When you submit the login form, we attempt to login.
     */
    handleSubmit(event) {
        event.preventDefault();
        console.log("In handle submit of LoginForm");

        let url = "http://localhost:5000/api/1.0/login/";
        axios.post(
            url,
            {
                username: this.state.username,
                password: this.state.password
            }
        )
        .then(res => {
            this.receiveResponse(res);
        })
        .catch(error => {
            console.log("Request failed with:\n" + error);
        })
    }

    handleUsernameChange(e) {
        this.setState({
            username: e.target.value
        })
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        })
    }

    receiveResponse(response) {
        console.log("Got response from API:\n" + response);
    }

    render() {
        return (
            <form
                className="main-login"
                onSubmit={this.handleSubmit}
            >
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        placeholder="Username"
                        onChange={this.handleUsernameChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        onChange={this.handlePasswordChange}
                    />
                </div>
                <button type="submit" className="btn btn-default">Login</button>
            </form>
        );
    }
}

export default LoginForm;
