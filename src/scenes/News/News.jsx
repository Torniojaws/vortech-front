import React from 'react';
import {render} from 'react-dom';
import NewsItem from './components/NewsItem/NewsItem.jsx';

import callApi from '../../services/Api/api.js';

class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            currentPage: 1,
            itemsPerPage: 5
        }
        this.handlePagination = this.handlePagination.bind(this);
    }

    /**
     * We send a request to the API here to retrieve all the News.
     */
    componentDidMount() {
        let promise = callApi("GET", "/news/", null);
        promise.then(resp => {
            this.setState({
                news: resp.data.news
            })
        }).catch(err => {
            console.log("Got error when retrieving:\n" + err);
        })
    }

    handlePagination(event) {
        this.setState({
            currentPage: Number(event.target.id)
        })
    }

    render() {
        // Build the details of the data
        const { news, currentPage, itemsPerPage } = this.state;
        const indexLastItem = currentPage * itemsPerPage;
        const indexFirstItem = indexLastItem - itemsPerPage;
        const currentNews = news.slice(indexFirstItem, indexLastItem);
        // The actual news items
        const currentNewsObjects = currentNews.map((obj, index) => {
            return obj;
        })
        // Page numbers
        const pageNumbers = [];
        for (let i=1; i<=Math.ceil(news.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }
        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li className="paginationBox" key={number} id={number} onClick={this.handlePagination}>
                    {number}
                </li>
            );
        })
        let counter = 0;
        return (
            <div id="page">
                <h2>News</h2>
                {
                    currentNewsObjects && currentNewsObjects.map(function(item) {
                        counter++
                        return <NewsItem key={item + counter} data={item} />
                    })
                }
                <hr />
                <p>Change news page:</p>
                <nav aria-label="Page navigation">
                    <ul id="pagination" className="pagination">
                        {renderPageNumbers}
                    </ul>
                </nav>
            </div>
        );
    }
}

export default News;
