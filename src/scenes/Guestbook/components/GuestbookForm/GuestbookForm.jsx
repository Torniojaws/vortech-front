import React from 'react';
import Recaptcha from 'react-recaptcha';
import callApi from '@/services/Api/api.js';
import axios from 'axios';

/**
 * Post an item to the guestbook. Contains Captcha v2
 */
class GuestbookForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      message: '',
      loggedIn: false,
      submitted: false,
      submitOk: false
    };
    this.getUserID = this.getUserID.bind(this);
    this.getUsername = this.getUsername.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    // Recaptcha
    this.onloadCallback = this.onloadCallback.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
  }

  componentDidMount () {
    // For logged in users, no Captcha is showm
    if (parseInt(localStorage.getItem('userID'))) {
      this.getUsername(localStorage.getItem('userID'));
      this.setState({ loggedIn: true });
    }
  }

  // specifying your onload callback function
  onloadCallback () {
    return 'Captcha';
  }

  // specifying verify callback function
  async verifyCallback (response) {
    // GET https://www.google.com/recaptcha/api/siteverify?secret=your_secret&response=${response}&remoteip=user_ip_addres
    const secret = '6LeV0DoUAAAAAExxJYlRe5gWuTy1ucgafTYcLkJf';
    const myIP = '127.0.0.1'; // get real one
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${response}&remoteip=${myIP}`;
    try {
      const response = await axios.get(url);
      return response.success;
    } catch (err) {
      return 'Error';
    }
  }

  /**
   * Return the UserID, if it exists in localStorage. Otherwise return the 'Guest ID', which is 1
   * @return {int} the UserID or guest ID
   */
  getUserID () {
    const userID = localStorage.getItem('userID');
    return !parseInt(userID)
      ? 1
      : parseInt(userID);
  }

  /**
   * Get the username via API, if logged in
   * @param {int} userID is the key to the data
   * @return {string} username
   */
  async getUsername (userID) {
    const headers = {
      'Authorization': localStorage.accessToken,
      'User': userID
    };
    try {
      const response = await callApi('GET', `/users/${userID}`, null, headers);
      this.setState({
        name: response.data.users[0].name
      });
    } catch (err) {
      return '';
    }
  }

  /**
   * When you submit the guestbook form, send it to the API.
   */
  async handleSubmit (event) {
    event.preventDefault();
    const payload = {
      userID: this.getUserID(),
      name: this.state.name,
      message: this.state.message
    };

    try {
      await callApi('POST', '/guestbook/', payload, null);
      this.setState({ submitted: true, submitOk: true });
      window.location.href = '/guestbook';
    } catch (err) {
      this.setState({ submitted: true, submitOk: false });
    }
  }

  handleChange (event) {
    const target = event.target;
    const value = target.type === 'checkbox'
      ? target.checked
      : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render () {
    return (
      <div>
        {
          this.state.submitted === true && this.state.submitOk === false &&
          <div className='alert alert-danger'>
            Posting to guestbook failed!
          </div>
        }
        {
          this.state.loggedIn &&
          <div className='alert alert-info'>
            Welcome, { this.state.name }! Wanna post a message?
          </div>
        }
        <form
          className='guestbook-form'
          onSubmit={ this.handleSubmit }
        >
          {
            this.state.loggedIn === false &&
            <div className='form-group'>
              <label htmlFor='name'>Your name:</label>
              <input
                type='text'
                className='form-control'
                name='name'
                placeholder='Your name'
                onChange={ this.handleChange }
              />
            </div>
          }
          <div className='form-group'>
            <label htmlFor='message'>Your message</label>
            <input
              type='text'
              className='form-control'
              name='message'
              placeholder='Your message'
              onChange={ this.handleChange }
            />
          </div>
          {
            this.state.loggedIn === false &&
            <Recaptcha
              sitekey='6LeV0DoUAAAAAExxJYlRe5gWuTy1ucgafTYcLkJf'
              render='explicit'
              verifyCallback={ this.verifyCallback }
              onloadCallback={ this.onloadCallback }
            />
          }
          <button type='submit' className='btn btn-default'>Post to Guestbook</button>
        </form>
      </div>
    );
  }
}

export default GuestbookForm;
