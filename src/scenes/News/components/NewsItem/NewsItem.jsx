import React from 'react';
import PropTypes from 'prop-types';
import capitalizeFirst from '@/services/Categories/Categories';

class NewsItem extends React.Component {
  render() {
    return (
      <div className='news'>
        <h3>
          { this.props.data.title }
          <small>
            { this.props.data.created }
            {
              this.props.data.updated &&
              <span> | <i>Updated:</i> { this.props.data.updated }</span>
            }
          </small>
        </h3>
        <div className='fadingBorder'>
          <p dangerouslySetInnerHTML={{ __html: this.props.data.contents.replace(/\n/g, '<br />')}}></p>
          {
            Array.isArray(this.props.data.categories) && this.props.data.categories.length > 0 &&
            <p>Categories: { this.props.data.categories.map((category, index) => {
              // All this is to remove the last comma when the array of categories is displayed
              return `${capitalizeFirst(category)}` + (index < this.props.data.categories.length - 1 ? ', ' : '');
            }) }</p>
          }
        </div>
      </div>
    );
  }
}

NewsItem.propTypes = {
  data: PropTypes.object.isRequired
};

export default NewsItem;
