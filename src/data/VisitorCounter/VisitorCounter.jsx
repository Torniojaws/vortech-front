import React from 'react';
import callApi from '@/services/Api/api.js';

class VisitorCounter extends React.Component {
  constructor (props) {
    super(props);
    this.getCount();
    this.state = {
      count: ''
    };
    this.updateCount = this.updateCount.bind(this);
    this.getCount = this.getCount.bind(this);
  }

  componentDidMount () {
    this.updateCount();
  }

  /**
   * Read the visitor count from API and add one (= current visit).
   */
  async getCount () {
    try {
      const response = await callApi('GET', '/visits/', null, null);
      // The number 1001305 is the last known visitor count from the previous site.
      this.setState({ count: 1001305 + parseInt(response.data.visits.all) });
    } catch(err) {
      return err;
    }
  }

  /**
   * Add the current visit to the DB. The backend expects {'increment': 1}, otherwise you will
   * get a 400 Bad Request. Don't update count if already incremented in this sesssion.
   */
  async updateCount () {
    // Only strings are possible in sessionStorage and localStorage
    if (sessionStorage.getItem('visited') === 'true') {
      return;
    }

    try {
      await callApi('POST', '/visits/', { 'increment': 1 }, null);
      sessionStorage.setItem('visited', 'true');
    } catch (err) {
      return err;
    }
  }

  render () {
    return (
      <section id='visitors'>
        <p>{ this.state.count } visitors</p>
      </section>
    );
  }
}

export default VisitorCounter;
