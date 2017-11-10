import React from 'react';
import {render} from 'react-dom';

import callApi from '../../services/Api/api.js';
import {formatDateYMD} from '../../services/Datetime/Datetime.js';

class Shows extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shows: []
        }
        this.getShows = this.getShows.bind(this);
        this.receiveResponse = this.receiveResponse.bind(this);
        this.formatDate = this.formatDate.bind(this);
    }

    componentWillMount() {
        this.getShows();
    }

    getShows() {
        let config = {'Authorization': localStorage.accessToken};
        let promise = callApi("GET", "/shows/", null, {'headers': config});

        promise.then(res => {
            this.receiveResponse(res);
        })
        .catch(error => {
            console.log("Request failed with:\n" + error);
        })
    }

    receiveResponse(r) {
        this.setState({
            shows: r.data.shows
        });
    }

    formatDate(dt) {
        return formatDateYMD(dt);
    }

    render() {
        return (
            <div>
                <h2>Shows</h2>
                <table className="table table-responsive">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Location</th>
                            <th>Venue</th>
                            <th>Other bands</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.shows.map(function(show) {
                                return (
                                    <tr key={show.venue}>
                                        <td>{this.formatDate(show.date)}</td>
                                        <td>{show.country}</td>
                                        <td>{show.venue}</td>
                                        <td>
                                            {
                                                show.otherBands.map(function(band) {
                                                    return <a href={band.website} key={band.name}>{band.name}</a>
                                                })
                                            }
                                        </td>
                                    </tr>
                                )
                            }, this)
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Shows;
