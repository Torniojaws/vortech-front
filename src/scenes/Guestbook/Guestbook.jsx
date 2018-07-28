import React from 'react';

import callApi from '@/services/Api/api.js';
import GuestbookForm from './components/GuestbookForm/GuestbookForm.jsx';
import GuestbookPost from './components/GuestbookPost/GuestbookPost.jsx';

class Guestbook extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      guestbook: this.getPosts()
    };
    this.getPosts = this.getPosts.bind(this);
  }

  async getPosts () {
    try {
      const response = await callApi('GET', '/guestbook/', null, null);
      this.setState({ guestbook: response.data.guestbook });
    } catch (err) {
      return [];
    }
  }

  render () {
    return (
      <div id='page'>
        <h2>Guestbook</h2>
        <GuestbookForm />
        <hr />
        {
          this.state.guestbook.length > 0 &&
          this.state.guestbook.map(post => <GuestbookPost key={ post.createdAt } data={ post } />)
        }
      </div>
    );
  }
}

export default Guestbook;
