import React from 'react';
import {render} from 'react-dom';

import callApi from '../../services/Api/api.js';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            username: ""
        }
        this.getUserData = this.getUserData.bind(this);
        this.receiveResponse = this.receiveResponse.bind(this);
    }

    componentWillMount() {
        this.getUserData();
    }

    /**
     * Fetch the details from the API for the UserID we received from login. We also use the
     * access token so that you can't simply change the UserID to get someone elses data.
     */
    getUserData() {
        let endpoint = "/users/" + localStorage.userID;
        let config = {'Authorization': localStorage.accessToken};

        let promise = callApi("GET", endpoint, null, {'headers': config});

        promise.then(res => {
            this.receiveResponse(res);
        })
        .catch(error => {
            console.log("Request failed with:\n" + error);
        })
    }

    receiveResponse(r) {
        let user = r.data.users[0];
        this.setState({
            name: user.name,
            email: user.email,
            username: user.username
        });
    }

    render() {
        return (
            <section>
                <h2>My Profile</h2>
                <div className="row">
                    <div className="col-sm-3">Name</div>
                    <div className="col-sm-9">{this.state.name}</div>
                </div>
                <div className="row">
                    <div className="col-sm-3">Email</div>
                    <div className="col-sm-9">{this.state.email}</div>
                </div>
                <div className="row">
                    <div className="col-sm-3">Username</div>
                    <div className="col-sm-9">{this.state.username}</div>
                </div>
            </section>
        );
    }
}

export default Profile;
