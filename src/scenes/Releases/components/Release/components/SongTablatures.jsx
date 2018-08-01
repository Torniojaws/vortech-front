import React from 'react';
import PropTypes from 'prop-types';
import callApi from '@/services/Api/api';

class SongTablatures extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      songId: parseInt(this.props.songId) || null,
      title: '',
      tabs: []
    };
    this.getTabPath = this.getTabPath.bind(this);
    this.getTabs = this.getTabs.bind(this);
    this.getTabs(this.state.songId);
  }

  getTabPath (filename) {
    return `static/tabs/${filename}`;
  }

  /**
   * Get the tabulature info for a given song
   */
  async getTabs (songId) {
    if (songId == null) return 'Invalid song ID';
    try {
      const response = await callApi('GET', `/songs/${songId}/tabs`, null, null);
      this.setState({ title: response.data.songTitle, tabs: response.data.tabs });
    } catch (err) {
      return;
    }
  }

  render () {
    return (
      this.state.tabs.map(tab => {
        return <td key={ tab.title }><a href={ this.getTabPath(tab.filename) }>{ tab.title }</a></td>;
      })
    );
  }
}

SongTablatures.propTypes = {
  songId: PropTypes.number.isRequired
};

export default SongTablatures;
