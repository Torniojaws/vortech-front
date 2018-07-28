import React from 'react';
import PropTypes from 'prop-types';
import { formatDateYMD } from '@/services/Datetime/Datetime.js';

class GuestbookPost extends React.Component {
  render () {
    return (
      <div className='guestbookPost'>
        <div className='row'>
          <div className='col-lg-3'>
            { this.props.data.name }<br/>
            { formatDateYMD(this.props.data.createdAt) }
          </div>
          <div className='col-sm-9'>
            <p dangerouslySetInnerHTML={{ __html: this.props.data.message
              .replace(/<br \/>/g, '\n')
              .replace(/</g, '&lt;')
              .replace(/\n/g, '<br />')
            }}></p>
          </div>
        </div>
        {
          this.props.data.adminComment &&
          <div className='row'>
            <div className='col-sm-12'>
              <p className='admin'><b>Vortech says:</b> { this.props.data.adminComment }</p>
            </div>
          </div>
        }
        <hr />
      </div>
    );
  }
}

GuestbookPost.propTypes = {
  data: PropTypes.object.isRequired
};

export default GuestbookPost;
