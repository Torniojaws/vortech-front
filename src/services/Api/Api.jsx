import React from 'react';
import {render} from 'react-dom';
import axios from 'axios';

/**
 * Handles calls to the backend, where we get JSON responses.
 * Generally you will pass two required props:
 * @param {string} method - for example GET or POST
 * @param {string} endpoint - the API endpoint you want to call, eg. /news/123/comments
 * @param {object} params - optional parameters for request, eg. JSON data for POST
 * @return {object} - the response from the API
 */
class Api extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            baseUrl: "http://localhost:5000/api/v1.0",
        }
        this.sendRequest = this.sendRequest.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
    }

    componentWillMount() {
        this.sendRequest();
    }

    sendRequest() {
        console.log(
            "Sending request:\n" + this.props.method + " " + this.props.endpoint +
            "\nWith parameters:\n" + this.props.params
        );
        let url = this.state.baseUrl + this.props.endpoint;
        switch (this.props.method) {
            case "GET":
                axios.get(url, {
                    data: this.props.params
                })
                .then(res => {
                    this.handleResponse(res);
                })
                .catch(error => {
                    console.log("Request failed with:\n" + error);
                })
                break;
            case "POST":
                axios.post(url, {
                    data: this.props.params
                })
                .then(res => {
                    this.handleResponse(res);
                })
                .catch(error => {
                    console.log("Request failed with:\n" + error);
                })
            default:
                console.log("Unknown method: " + this.props.method);
                return;
        }
    }

    /**
     * Receive the response from API. This is generally passed on to the parent component via the
     * predetermined function receiveResponse() passed by the parent.
     */
    handleResponse(response) {
        console.log("Passing response to parent. Data is:\n" + response.data);
        this.props.receiveResponse(response.data);
    }

    render() {
        return null;
    }
}

export default Api;
