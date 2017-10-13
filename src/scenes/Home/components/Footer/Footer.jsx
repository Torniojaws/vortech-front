import React from 'react';
import {render} from 'react-dom';

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.getYear = this.getYear.bind(this);
        this.getVisitorCount = this.getVisitorCount.bind(this);
    }

    getYear() {
        return new Date().getFullYear();
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
                Copyright &copy; {this.getYear()} Vortech<br />
                <br />
                {this.getVisitorCount()} visitors
            </footer>
        );
    }
}

export default Footer;
