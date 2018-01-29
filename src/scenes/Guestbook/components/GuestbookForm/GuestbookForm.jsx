import React from 'react';
import {render} from 'react-dom';

import Recaptcha from 'react-recaptcha';
import callApi from '../../../../services/Api/api.js';

/**
 * Post an item to the guestbook. Contains Captcha v2
 */
class GuestbookForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            message: "",
            loggedIn: false,
            submitted: false,
            submitOk: false
        }
        this.getUserID = this.getUserID.bind(this);
        this.getUsername = this.getUsername.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.receiveResponse = this.receiveResponse.bind(this);
        this.captchaCallback = this.captchaCallback.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
    }

    componentDidMount() {
        // For logged in users, no Captcha is showm
        if (parseInt(localStorage.getItem("userID"))) {
            // Get username
            this.getUsername(localStorage.getItem("userID"));

            this.setState({
                loggedIn: true
            })
        }
    }

    // specifying your onload callback function
    captchaCallback() {
        console.log('Done!!!!');
    }

    // specifying verify callback function
    verifyCallback(response) {
        console.log("recaptcha response:\n" + response);
    }

    /**
     * Return the UserID, if it exists in localStorage. Otherwise return the "Guest ID", which is 1
     * @return {int} the UserID or guest ID
     */
    getUserID() {
        let userID = localStorage.getItem("userID");
        return !parseInt(userID)
            ? 1
            : parseInt(userID);
    }

    /**
     * Get the username via API, if logged in
     * @param {int} userID is the key to the data
     * @return {string} username
     */
    getUsername(userID) {
        let endpoint = "/users/" + userID;
        let headers = {
            'Authorization': localStorage.accessToken,
            'User': userID
        };

        let promise = callApi("GET", endpoint, null, headers);

        promise.then(res => {
            this.setState({
                name: res.data.users[0].name
            });
        })
        .catch(error => {
            console.log("Request failed with:\n" + error);
        })
    }

    /**
     * When you submit the guestbook form, send it to the API.
     */
    handleSubmit(event) {
        event.preventDefault();

        let promise = callApi("POST", "/guestbook/", {
            userID: this.getUserID(),
            name: this.state.name,
            message: this.state.message
        }, null)

        promise.then(res => {
            this.receiveResponse(res);
        })
        .catch(error => {
            console.log("Request failed with:\n" + error);
            this.setState({
                submitted: true,
                submitOk: false
            })
        })
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox'
            ? target.checked
            : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    receiveResponse(response) {
        console.log("Response is:\n" + response);
        console.log("Response status = " + response.status);
        if (response.status === 201) {
            this.setState({
                submitted: true,
                submitOk: true
            })
            window.location.href = "/guestbook";
        } else {
            this.setState({
                submitted: true,
                submitOk: false
            })
            console.log("Submit failed");
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.submitted === true && this.state.submitOk === false &&
                    <div className="alert alert-danger">
                        Posting to guestbook failed!
                    </div>
                }
                {
                    this.state.loggedIn &&
                    <div className="alert alert-info">
                        Welcome, {this.state.name}! Wanna post a message?
                    </div>
                }
                <form
                    className="guestbook-form"
                    onSubmit={this.handleSubmit}
                >
                    {
                        this.state.loggedIn === false &&
                        <div className="form-group">
                            <label htmlFor="name">Your name:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                placeholder="Your name"
                                onChange={this.handleChange}
                            />
                        </div>
                    }
                    <div className="form-group">
                        <label htmlFor="message">Your message</label>
                        <input
                            type="text"
                            className="form-control"
                            name="message"
                            placeholder="Your message"
                            onChange={this.handleChange}
                        />
                    </div>
                    {
                        this.state.loggedIn === false &&
                        <Recaptcha
                            sitekey="6LeV0DoUAAAAAExxJYlRe5gWuTy1ucgafTYcLkJf"
                            render="explicit"
                            verifyCallback={this.verifyCallback}
                            onloadCallback={this.captchaCallback}
                        />
                    }
                    <button type="submit" className="btn btn-default">Post to Guestbook</button>
                </form>
            </div>
        );
    }
}

export default GuestbookForm;
