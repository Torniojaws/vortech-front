import React from 'react';

import callApi from '@/services/Api/api.js';

class VisitorCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: this.getCount()
    };
    this.updateCount = this.updateCount.bind(this);
    this.getCount = this.getCount.bind(this);
  }

  componentDidMount() {
    this.updateCount();
  }

  /**
   * Read the visitor count from API and add one (= current visit).
   */
  getCount() {
    const response = callApi('GET', '/visits/', null, null);

    response.then(res => {
      // The number 1001305 is the last known visitor count from the previous site.
      this.setState({
        count: 1001305 + parseInt(res.data.visits.all)
      });
    })
    .catch(err => err);
  }

  /**
   * Add the current visit to the DB. The backend expects {'increment': 1}, otherwise you will
   * get a 400 Bad Request. Don't update count if already incremented in this sesssion.
   */
  updateCount() {
    // Only strings are possible in sessionStorage and localStorage
    if (sessionStorage.getItem('visited') === 'true') {
      return;
    }

    const response = callApi('POST', '/visits/', { 'increment': 1 }, null);
    response.then(() => {
      sessionStorage.setItem('visited', 'true');
    })
    .catch(err => err);
  }

  render() {
    return (
      <section id='visitors'>
        <p>{ this.state.count } visitors</p>
      </section>
    );
  }
}

export default VisitorCounter;
