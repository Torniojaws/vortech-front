import React from 'react';
import callApi from '@/services/Api/api.js';
import { formatDateYMD } from '@/services/Datetime/Datetime.js';

class Shows extends React.Component {
  constructor (props) {
    super(props);
    this.getShows();
    this.state = {
      shows: []
    };
    this.getShows = this.getShows.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }

  async getShows () {
    const headers = { 'Authorization': localStorage.accessToken };
    try {
      const response = await callApi('GET', '/shows/', null, headers);
      this.setState({ shows: response.data.shows.reverse() });
    } catch (err) {
      return err;
    }
  }

  formatDate (dt) {
    return formatDateYMD(dt);
  }

  render () {
    return (
      <div>
        <h2>Shows</h2>
        <table className='table table-responsive'>
          <thead>
            <tr>
              <th className='col-sm-3'>Date</th>
              <th className='col-sm-2'>Location</th>
              <th className='col-sm-3'>Venue</th>
              <th className='col-sm-5'>Other bands</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.shows.map(function (show) {
                return (
                  <tr key={ show.venue }>
                    <td>{ this.formatDate(show.date) }</td>
                    <td>{ show.countryCode }, { show.city }</td>
                    <td>{ show.venue }</td>
                    <td>
                      {
                        show.otherBands.map((band, index) => {
                          return (
                            <span key={ band.name }>
                              {
                                band.website
                                  ? <a href={ band.website }>{ band.name }</a>
                                  : <span>{ band.name }</span>
                              }
                              {
                                (index < show.otherBands.length - 1 ? ', ' : '')
                              }
                            </span>
                          );
                        })
                      }
                    </td>
                  </tr>
                );
              }, this)
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default Shows;
