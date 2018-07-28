import React from 'react';
import callApi from '@/services/Api/api.js';

class Biography extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      bio: ''
    };
  }

  async componentDidMount () {
    try {
      const response = await callApi('GET', '/biography/', null, null);
      this.setState({ bio: response.data.biography[0] });
    } catch (err) {
      return err;
    }
  }

  render () {
    return (
      <div>
        <h2>Biography</h2>
        <div dangerouslySetInnerHTML={{ __html: this.state.bio.short }}></div>
      </div>
    );
  }
}

export default Biography;
