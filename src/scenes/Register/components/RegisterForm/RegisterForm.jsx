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
    this.handleChange = this.handleChange.bind(this);
    this.receiveResponse = this.receiveResponse.bind(this);
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
      const response = await callApi('POST', '/users/', payload, {});
      this.receiveResponse(response, resultInfoBox);
    } catch (err) {
      this.handleError(err, resultInfoBox);
    }
  }

  handleError (err, resultInfoBox) {
    const data = err.response.data;
    let message = data.result
      ? `${data.result}<br />`
      : 'No response from server - try again';

    if (data.errors) {
      Object.keys(data.errors).forEach((key) => {
        message += key + ': ' + data.errors[key][0] + '<br />';
      });
    }

    resultInfoBox.className = 'alert alert-danger';
    resultInfoBox.innerHTML = message;
  }

  receiveResponse (response, resultInfoBox) {
    if (response.status === 201) {
      resultInfoBox.className = 'alert alert-success';
      resultInfoBox.innerHTML = 'Successfully registered!';
    } else {
      resultInfoBox.className = 'alert alert-danger';
      resultInfoBox.innerHTML = `${response.data.result}`;
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
