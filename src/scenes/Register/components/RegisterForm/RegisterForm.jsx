import React from 'react';
import callApi from '@/services/Api/api.js';

class RegisterForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  /**
   * When you submit the register form, the user is created.
   */
  async handleSubmit (event) {
    event.preventDefault();
    const resultInfoBox = document.getElementById('registerResult');
    const payload = {
      name: this.state.name,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    };

    try {
      await callApi('POST', '/users/', payload, null);
      resultInfoBox.className = 'alert alert-success';
      resultInfoBox.innerHTML = 'Successfully registered!';
    } catch (err) {
      resultInfoBox.className = 'alert alert-danger';
      resultInfoBox.innerHTML = '<b>Error:</b> ' + err.response.data.result;
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
        <div className='col-sm-6'>
          <form className='registerForm' onSubmit={ this.handleSubmit }>
            <div className='form-group'>
              <label htmlFor='name'>Display name (<b>Required</b>)</label>
              <input
                type='text'
                className='form-control'
                name='name'
                placeholder='This is shown as your name in the comments'
                onChange={ this.handleChange }
              />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input
                type='text'
                className='form-control'
                name='email'
                placeholder='Optional, Used if you subscribe to newsletters'
                onChange={ this.handleChange }
              />
            </div>
            <div className='form-group'>
              <label htmlFor='name'>Username (<b>Required</b>)</label>
              <input
                type='text'
                className='form-control'
                name='username'
                placeholder='You login with this name'
                onChange={ this.handleChange }
              />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Password (<b>Required</b>)</label>
              <input
                type='password'
                className='form-control'
                name='password'
                placeholder='You login with this'
                onChange={ this.handleChange }
              />
            </div>
            <button type='submit' className='btn btn-default'>Register</button>
          </form>
        </div>
        <div className='col-sm-6'>
          <div id='registerResult'></div>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
