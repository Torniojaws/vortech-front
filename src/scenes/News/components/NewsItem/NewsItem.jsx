import React from 'react';
import PropTypes from 'prop-types';
import capitalizeFirst from '@/services/Categories/Categories';
import { RIEInput, RIETextArea } from '@attently/riek';
import _ from 'lodash';
import callApi from '@/services/Api/api.js';

class NewsItem extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      id: this.props.data.id,
      title: this.props.data.title,
      created: this.props.data.created,
      updated: this.props.data.updated,
      contents: this.props.data.contents,
      categories: this.props.data.categories,
      userIsAdmin: localStorage.showForms || false,
    };
    this.editTitle = this.editTitle.bind(this);
    this.editContents = this.editContents.bind(this);
    this.receiveResponse = this.receiveResponse.bind(this);
  }

  async editTitle (newTitle) {
    // NB: the ".title" must match with the "propName" in RIEInputArea
    const payload = [{ op: 'replace', path: '/title', value: newTitle.title }];
    const headers = {
      'User': localStorage.userID,
      'Authorization': localStorage.accessToken
    };
    try {
      const response = await callApi('PATCH', `/news/${this.state.id}`, payload, headers);
      this.receiveResponse(response, 'title');
    } catch (err) {
      // Could not update news
    }
  }

  async editContents (updatedText) {
    // NB: the ".contents" must match with the "propName" in RIETextArea
    const payload = [{ op: 'replace', path: '/contents', value: updatedText.contents }];
    const headers = {
      'User': localStorage.userID,
      'Authorization': localStorage.accessToken
    };
    try {
      const response = await callApi('PATCH', `/news/${this.state.id}`, payload, headers);
      this.receiveResponse(response, 'contents');
    } catch (err) {
      // Could not update news
    }
  }

  receiveResponse (response, field) {
    if (response.status === 200) {
      this.setState({ [field]: response.data[field] });
    }
  }

  render () {
    return (
      <div className='news'>
        <h3>
          {
            this.state.userIsAdmin &&
            <RIEInput
              value={ this.state.title }
              change={ this.editTitle }
              propName='title'
              validate={ _.isString }
            />
          }
          { !this.state.userIsAdmin && this.state.title }
          <small className='float-right text-lg-right'>
            { this.state.created }
            { this.state.updated &&
              <i><br/>Updated: { this.state.updated }</i>
            }
          </small>
        </h3>
        <div className='fadingBorder'>
          {
            this.state.userIsAdmin &&
            <p><RIETextArea
              value={ this.state.contents }
              change={ this.editContents }
              propName='contents'
              validate={ _.isString }
              rows={ 10 }
              cols={ 60 }
            />
            </p>
          }
          {
            !this.state.userIsAdmin &&
            <p dangerouslySetInnerHTML={{ __html: this.state.contents.replace(/\n/g, '<br />') }}></p>
          }
          {
            Array.isArray(this.state.categories) && this.state.categories.length > 0 &&
            <p>Categories: { this.state.categories.map((category, index) => {
              // All this is to remove the last comma when the array of categories is displayed
              return `${capitalizeFirst(category)}` + (index < this.state.categories.length - 1 ? ', ' : '');
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
