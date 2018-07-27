import React from 'react';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: new Date().getFullYear()
    };
    this.getVisitorCount = this.getVisitorCount.bind(this);
  }

  /**
   * Get the amount of visitors from the backend API
   */
  getVisitorCount() {
    return 1234;
  }

  render() {
    return (
      <footer>
        <hr />
        Copyright &copy; { this.year } Vortech<br />
        <br />
        { this.getVisitorCount() } visitors
      </footer>
    );
  }
}

export default Footer;
