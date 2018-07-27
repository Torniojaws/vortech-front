import React from 'react';

import callApi from '@/services/Api/api.js';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: this.getContactData()
    };
    this.getContactData = this.getContactData.bind(this);
  }

  async getContactData() {
    const config = { 'Authorization': localStorage.accessToken };
    try {
      const response = await callApi('GET', '/contacts/', null, { 'headers': config });
      this.setState({ contact: response.data.contacts[0] });
    } catch (err) {
      return;
    }
  }

  render() {
    return (
      <div id='page'>
        <h2>Contact</h2>
        <p>Feel free to contact us via email at <a href={ `mailto:${this.state.contact.email}` }>{this.state.contact.email}</a></p>
        <hr />
        <h3>Documents</h3>
        <p>Here&apos;s our latest rider, input list, and backline information:</p>
        <ul>
          <li><a href={ `static/docs/${this.state.contact.techRider}` }>Tech Rider</a></li>
          <li><a href={ `static/docs/${this.state.contact.inputList}` }>Input List</a></li>
          <li><a href={ `static/docs/${this.state.contact.backline}` }>Backline</a></li>
        </ul>
      </div>
    );
  }
}

export default Contact;
