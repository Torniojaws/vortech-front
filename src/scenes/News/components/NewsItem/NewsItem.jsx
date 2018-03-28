import React from 'react';
import {render} from 'react-dom';

class NewsItem extends React.Component {
    render() {
        return (
            <div className="news">
                <h3>
                    {this.props.data.title}
                    <small>
                        {this.props.data.created}
                        {
                            this.props.data.updated &&
                            <span> | <i>Updated:</i> {this.props.data.updated}</span>
                        }
                    </small>
                </h3>
                <div className="fadingBorder">
                    <p dangerouslySetInnerHTML={{ __html: this.props.data.contents.replace(/\n/g, '<br />')}}></p>
                    {
                        Array.isArray(this.props.data.categories) && this.props.data.categories.length > 0 &&
                        <p>Categories: {this.props.data.categories}</p>
                    }
                </div>
            </div>
        );
    }
}

export default NewsItem;
