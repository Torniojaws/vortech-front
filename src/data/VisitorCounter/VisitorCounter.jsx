import React from 'react';
import {render} from 'react-dom';

import callApi from '../../services/Api/api.js';

class VisitorCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: ""
        }
        this.updateCount = this.updateCount.bind(this);
        this.getCount = this.getCount.bind(this);
    }

    componentWillMount() {
        this.getCount();
    }

    componentDidMount() {
        this.updateCount();
    }

    /**
     * Read the visitor count from API and add one (= current visit).
     */
    getCount() {
        let promise = callApi("GET", "/visits/", null, null);

        promise.then(res => {
            // The number 1001305 is the last known visitor count from the previous site.
            this.setState({
                count: 1001305 + parseInt(res.data.visits.all)
            })
        })
        .catch(error => {
            console.log("Request failed with:\n" + error);
        })
    }

    /**
     * Add the current visit to the DB. The backend expects {"increment": 1}, otherwise you will
     * get a 400 Bad Request. Don't update count if already incremented in this sesssion.
     */
    updateCount() {
        // It seems you cannot store a boolean type value, it would return as string.
        if (sessionStorage.getItem("visited") === "true") {
            return;
        }

        let promise = callApi("POST", "/visits/", {"increment": 1}, null);
        promise.then(res => {
            sessionStorage.setItem("visited", "true");
        })
        .catch(error => {
            console.log("Request failed with:\n" + error);
        })
    }

    render() {
        return (
            <section id="visitors">
                <p>{this.state.count} visitors</p>
            </section>
        );
    }
}

export default VisitorCounter;
