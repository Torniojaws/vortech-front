import React from 'react';
import callApi from '@/services/Api/api.js';
import Release from '../Release/Release.jsx';

class AllReleases extends React.Component {
  constructor (props) {
    super(props);
    this.getReleases();
    this.state = {
      releases: []
    };
    this.getReleases = this.getReleases.bind(this);
  }

  async getReleases () {
    const headers = { 'Authorization': localStorage.accessToken };
    try {
      const response = await callApi('GET', '/releases/', null, headers);
      // Sort the albums by release date - newest first
      this.setState({ releases: response.data.releases.sort(
        (a, b) => (a.releaseDate < b.releaseDate) ? 1 : -1
      ) });
    } catch (err) {
      return err;
    }
  }

  render () {
    return (
      <section>
        {
          this.state.releases.map(function (release) {
            return <Release key={ release.id } release={ release } />;
          })
        }
      </section>
    );
  }
}

export default AllReleases;
