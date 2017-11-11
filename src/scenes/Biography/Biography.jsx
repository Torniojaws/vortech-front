import React from 'react';
import {render} from 'react-dom';

import callApi from '../../services/Api/api.js';

class Biography extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: ""
        }
        this.receiveResponse = this.receiveResponse.bind(this);
    }

    componentDidMount() {
        let promise = callApi("GET", "/biography/", null, null);
        promise.then(res => {
            this.receiveResponse(res);
        })
        .catch(error => {
            console.log("Request failed with:\n" + error);
        })
    }

    receiveResponse(res) {
        this.setState({
            bio: res.data.biography[0]
        })
    }

    render() {
        return (
            <div>
                <h2>Biography</h2>
                <div dangerouslySetInnerHTML={{__html: this.state.bio.short}}></div>
            </div>
        );
    }
}

export default Biography;
