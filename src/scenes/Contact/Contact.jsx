import React from 'react';
import {render} from 'react-dom';

import callApi from '../../services/Api/api.js';

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: []
        }
        this.getContactData = this.getContactData.bind(this);
        this.receiveResponse = this.receiveResponse.bind(this);
    }

    componentWillMount() {
        this.getContactData();
    }

    getContactData() {
        let config = {'Authorization': localStorage.accessToken};
        let promise = callApi("GET", "/contacts/", null, {'headers': config});

        promise.then(res => {
            this.receiveResponse(res);
        })
        .catch(error => {
            console.log("Request failed with:\n" + error);
        })
    }

    receiveResponse(r) {
        this.setState({
            contact: r.data.contacts[0]
        });
    }

    render() {
        return (
            <div id="page">
                <h2>Contact</h2>
                <p>Feel free to contact us via email at <a href={"mailto:" + this.state.contact.email}>{this.state.contact.email}</a></p>
                <hr />
                <h3>Documents</h3>
                <p>Here's our latest rider, input list, and backline information:</p>
                <ul>
                    <li><a href={"static/docs/" + this.state.contact.techRider}>{this.state.contact.techRider}</a></li>
                    <li><a href={"static/docs/" + this.state.contact.inputList}>{this.state.contact.inputList}</a></li>
                    <li><a href={"static/docs/" + this.state.contact.backline}>{this.state.contact.backline}</a></li>
                </ul>
            </div>
        );
    }
}

export default Contact;
