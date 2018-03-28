import React from 'react';
import {render} from 'react-dom';

import callApi from '../../../../services/Api/api.js';

class AddNews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            added: false,
            title: "",
            contents: "",
            author: "",
            categories: []
        }
        this.addNews = this.addNews.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.receiveResponse = this.receiveResponse.bind(this);
    }

    addNews(event) {
        event.preventDefault();

        let data = {
            title: this.state.title,
            contents: this.state.contents,
            author: this.state.author,
            categories: this.state.categories
        };

        let headers = {
            'User': localStorage.userID,
            'Authorization': localStorage.accessToken
        };

        console.log("Adding news:\n" + JSON.stringify(data) + "\nwith headers:\n" + JSON.stringify(headers));

        let promise = callApi("POST", "/news/", data, headers);

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
                <h2>Add News</h2>
                {
                    this.state.added &&
                    <div className="alert alert-success">
                        <strong>News added!</strong>
                    </div>
                }
                {
                    localStorage.showForms &&
                    <form
                        className="news-form"
                        onSubmit={this.addNews}
                    >
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                placeholder="Title for the news"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contents">News</label>
                            <textarea
                                className="form-control"
                                name="contents"
                                placeholder="Contents of the news"
                                onChange={this.handleChange}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="author">Author</label>
                            <input
                                type="text"
                                className="form-control"
                                name="author"
                                placeholder="Author name"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="categories">Categories</label>
                            <input
                                type="text"
                                className="form-control"
                                name="categories"
                                placeholder="Categories (comma separate to create new)"
                                onChange={this.handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-default">Submit news</button>
                    </form>
                }
            </div>
        );
    }
}

export default AddNews;
