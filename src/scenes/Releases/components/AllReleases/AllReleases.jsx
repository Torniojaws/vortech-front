import React from 'react';
import {render} from 'react-dom';

import callApi from '../../../../services/Api/api.js';

import Release from '../Release/Release.jsx';

class AllReleases extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            releases: []
        }
        this.getReleases = this.getReleases.bind(this);
        this.receiveResponse = this.receiveResponse.bind(this);
    }

    componentWillMount() {
        this.getReleases();
    }

    getReleases() {
        let config = {'Authorization': localStorage.accessToken};
        let promise = callApi("GET", "/releases/", null, {'headers': config});

        promise.then(res => {
            this.receiveResponse(res);
        })
        .catch(error => {
            console.log("Request failed with:\n" + error);
        })
    }

    receiveResponse(r) {
        this.setState({
            releases: r.data.releases
        });
    }

    render() {
        return (
            <section>
                {
                    this.state.releases.map(function(release) {
                        return <Release key={release.id} release={release} />;
                    })
                }
            </section>
        );
    }
}

export default AllReleases;
