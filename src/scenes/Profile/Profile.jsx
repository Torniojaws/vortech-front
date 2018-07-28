import React from 'react';
import callApi from '@/services/Api/api.js';

class Profile extends React.Component {
  constructor (props) {
    super(props);
    this.getUserData();
    this.state = {
      name: '',
      email: '',
      username: '',
      admin: false
    };
    this.getUserData = this.getUserData.bind(this);
    this.receiveResponse = this.receiveResponse.bind(this);
  }

  /**
   * Fetch the details from the API for the UserID we received from login. We also use the
   * access token so that you can't simply change the UserID to get someone elses data.
   */
  async getUserData () {
    const headers = {
      'Authorization': localStorage.accessToken,
      'User': localStorage.userID
    };

    try {
      const response = await callApi('GET', `/users/${localStorage.userID}`, null, headers);
      this.receiveResponse(response);
    } catch (err) {
      return;
    }
  }

  receiveResponse (r) {
    const user = r.data.users[0];
    // 1=Guest, 2=Registered, 3=Moderator, 4=Admin
    const admin = user.level === 4
      ? true
      : false;

    // NB: While localStorage can be modified somewhat easily in client-side, it is not so
    // useful for nefarious purposes since we do server-side validation. This is simply to
    // toggle showing the admin forms, which normally are not needed for non-admins. Even if
    // see them, the form submission will be rejected without valid admin rights server-side.
    localStorage.setItem('showForms', admin.toString());

    this.setState({
      name: user.name,
      email: user.email,
      username: user.username,
      admin: admin
    });
  }

  render () {
    return (
      <div>
        <section>
          <h2>My Profile</h2>
          <div className='row'>
            <div className='col-sm-3'>Name</div>
            <div className='col-sm-9'>{this.state.name}</div>
          </div>
          <div className='row'>
            <div className='col-sm-3'>Email</div>
            <div className='col-sm-9'>{this.state.email}</div>
          </div>
          <div className='row'>
            <div className='col-sm-3'>Username</div>
            <div className='col-sm-9'>{this.state.username}</div>
          </div>
        </section>
        {
          this.state.admin &&
          <section>
            <hr />
            <h2>Admin features</h2>
            <ul>
              <li><a href='/addNews'>Add news</a></li>
              <li><a href='/addRelease'>Add release</a></li>
              <li><a href='/updateBiography'>Update biography</a></li>
              <li><a href='/addShow'>Add show</a></li>
              <li><a href='/addShop'>Add shop item</a></li>
              <li><a href='/addVideo'>Add video</a></li>
            </ul>
          </section>
        }
      </div>
    );
  }
}

export default Profile;
