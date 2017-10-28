import React from 'react';
import {render} from 'react-dom';

import callApi from '../../../../services/Api/api.js';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            username: "",
            password: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    /**
     * When you submit the register form, the user is created.
     */
    handleSubmit(event) {
        event.preventDefault();

        let resultInfoBox = document.getElementById('registerResult');

        let promise = callApi("POST", "/users/", {
            name: this.state.name,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        })

        promise.then(res => {
            console.log("User created!");
            resultInfoBox.className = "alert alert-success";
            resultInfoBox.innerHTML = "Successfully registered!";
        })
        .catch(error => {
            console.log("Request failed with:\n" + JSON.stringify(error));
            resultInfoBox.className = "alert alert-danger";
            resultInfoBox.innerHTML = "<b>Error:</b> " + error.response.data.result;
        })
    }

    handleNameChange(e) {
        this.setState({
            name: e.target.value
        })
    }
    handleEmailChange(e) {
        this.setState({
            email: e.target.value
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

    render() {
        return (
            <div>
                <div className="col-sm-6">
                    <form className="registerForm" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Display name (<b>Required</b>)</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                placeholder="This is shown as your name in the comments"
                                onChange={this.handleNameChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                placeholder="Optional, Used if you subscribe to newsletters"
                                onChange={this.handleEmailChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Username (<b>Required</b>)</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                placeholder="You login with this name"
                                onChange={this.handleUsernameChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Password (<b>Required</b>)</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="You login with this"
                                onChange={this.handlePasswordChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-default">Register</button>
                    </form>
                </div>
                <div className="col-sm-6">
                    <div id="registerResult"></div>
                </div>
            </div>
        );
    }
}

export default RegisterForm;
