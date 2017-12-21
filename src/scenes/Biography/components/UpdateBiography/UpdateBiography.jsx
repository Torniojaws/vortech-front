import React from 'react';
import {render} from 'react-dom';

import callApi from '../../../../services/Api/api.js';

class UpdateBiography extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updated: false,
            short: "",
            full: ""
        }
        this.updateBio = this.updateBio.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.receiveResponse = this.receiveResponse.bind(this);
    }

    updateBio(event) {
        event.preventDefault();

        let data = {
            short: this.state.short,
            full: this.state.full
        };

        let headers = {
            'User': localStorage.UserID,
            'Authorization': localStorage.accessToken
        };

        let promise = callApi("POST", "/biography/", data, headers);

        promise.then(res => {
            this.receiveResponse(res);
        })
        .catch(error => {
            console.log("Request failed with:\n" + error);
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

    receiveResponse(r) {
        this.setState({
            added: r.status === 201
        });
    }

    render() {
        return (
            <div>
                <h2>Update Biography</h2>
                {
                    this.state.updated &&
                    <div className="alert alert-success">
                        <strong>Biography updated!</strong>
                    </div>
                }
                {
                    localStorage.showForms &&
                    <form
                        className="bio-form"
                        onSubmit={this.updateBio}
                    >
                        <div className="form-group">
                            <label htmlFor="short">Short biography</label>
                            <textarea
                                className="form-control"
                                name="short"
                                placeholder="Contents of the short bio"
                                onChange={this.handleChange}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="full">Full biography</label>
                            <textarea
                                className="form-control"
                                name="full"
                                placeholder="Contents of the full biography"
                                onChange={this.handleChange}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-default">Update biography</button>
                    </form>
                }
            </div>
        );
    }
}

export default UpdateBiography;