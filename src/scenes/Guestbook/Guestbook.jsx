import React from 'react';
import {render} from 'react-dom';

import callApi from '../../services/Api/api.js';
import GuestbookPost from './components/GuestbookPost/GuestbookPost.jsx';

class Guestbook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guestbook: []
        }
        this.getPosts = this.getPosts.bind(this);
        this.receiveResponse = this.receiveResponse.bind(this);
    }

    componentWillMount() {
        this.getPosts();
    }

    getPosts() {
        let promise = callApi("GET", "/guestbook/", null, null);

        promise.then(res => {
            this.receiveResponse(res);
        })
        .catch(error => {
            console.log("Request failed with:\n" + error);
        })
    }

    receiveResponse(r) {
        this.setState({
            guestbook: r.data.guestbook
        });
    }

    render() {
        return (
            <div id="page">
                <h1>Guestbook</h1>
                <div className="alert alert-warning">The guestbook is in read-only mode! Adding new
                posts will be enabled soon!</div>
                {
                    this.state.guestbook.map(function(post) {
                        return <GuestbookPost key={post.createdAt} data={post} />
                    })
                }
            </div>
        );
    }
}

export default Guestbook;
