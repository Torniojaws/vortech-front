import React from 'react';
import {render} from 'react-dom';

class NewsItem extends React.Component {
    render() {
        return (
            <div>
                <h3>
                    {this.props.data.title}
                    <small> {this.props.data.date}</small>
                </h3>
                <hr />
                <div className="indent">
                    <div dangerouslySetInnerHTML={{ __html: this.props.data.text}}></div>
                    <i>- {this.props.data.author}</i>
                </div>
            </div>
        );
    }
}

export default NewsItem;
