import React from 'react';
import callApi from '@/services/Api/api.js';

class AddShow extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      added: false,
      showDate: '',
      countryCode: '',
      country: '',
      city: '',
      venue: ''
    };
    this.addShow = this.addShow.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async addShow (event) {
    event.preventDefault();
    const data = {
      showDate: this.state.showDate,
      countryCode: this.state.countryCode,
      country: this.state.country,
      city: this.state.city,
      venue: this.state.venue
    };

    const headers = {
      'User': localStorage.userID,
      'Authorization': localStorage.accessToken
    };

    try {
      const response = await callApi('POST', '/shows/', data, headers);
      this.setState({ added: response.status === 201 });
    } catch (err) {
      return err;
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
        <h2>Add Show</h2>
        {
          this.state.added &&
          <div className='alert alert-success'>
            <strong>Show added!</strong>
          </div>
        }
        {
          localStorage.showForms &&
          <form className='shows-form' onSubmit={ this.addShow }>
            <div className='form-group'>
              <label htmlFor='showDate'>Date</label>
              <input
                type='text'
                className='form-control'
                name='showDate'
                placeholder='Date of the show (YYYY-MM-DD HH:MM:SS)'
                onChange={ this.handleChange }
              />
            </div>
            <div className='form-group'>
              <label htmlFor='countryCode'>Country code</label>
              <input
                type='text'
                className='form-control'
                name='countryCode'
                placeholder='Country code (2 digits)'
                onChange={ this.handleChange }
              />
            </div>
            <div className='form-group'>
              <label htmlFor='country'>Country</label>
              <input
                type='text'
                className='form-control'
                name='country'
                placeholder='Country'
                onChange={ this.handleChange }
              />
            </div>
            <div className='form-group'>
              <label htmlFor='city'>City</label>
              <input
                type='text'
                className='form-control'
                name='city'
                placeholder='City name'
                onChange={ this.handleChange }
              />
            </div>
            <div className='form-group'>
              <label htmlFor='venue'>Venue</label>
              <input
                type='text'
                className='form-control'
                name='venue'
                placeholder='Name of the venue'
                onChange={ this.handleChange }
              />
            </div>
            <button type='submit' className='btn btn-default'>Add show</button>
          </form>
        }
      </div>
    );
  }
}

export default AddShow;
