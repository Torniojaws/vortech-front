import React from 'react';
import Modal from 'react-responsive-modal';
import callApi from '@/services/Api/api.js';
import PropTypes from 'prop-types';
import { formatDateYMD, formatSeconds } from '@/services/Datetime/Datetime.js';

class Release extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      downloadCount: 0,
      open: false,
      lyrics: {
        lyrics: '',
        author: '',
        songTitle: ''
      }
    };
    this.getCoverPath = this.getCoverPath.bind(this);
    this.getDownloadPath = this.getDownloadPath.bind(this);
    this.addDownload = this.addDownload.bind(this);
    this.getFilename = this.getFilename.bind(this);
    this.getDownloadCount = this.getDownloadCount.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  componentDidMount () {
    this.getDownloadCount();
  }

  /**
   * These are for the lyrics modal window
   */
  async onOpenModal (songId) {
    try {
      const response = await callApi('GET', `/songs/${songId}/lyrics/`, null, null);
      this.setState({ lyrics: response.data, open: true });
    } catch (err) {
      return err;
    }
  }

  onCloseModal () {
    this.setState({ open: false });
  }

  /**
   * Return the path to the album cover, where the cover is identified by the release Code, eg.
   * static/img/releases/VOR001.jpg
   * @param {string} releaseCode is the identifier
   * @return {string} the path to the image
   */
  getCoverPath (releaseCode) {
    return `static/img/releases/${releaseCode}.jpg`;
  }

  /**
   * This is the physical location of the ZIP file
   * @param {string} releaseCode is the ID of the release, eg. VOR002
   * @return {string} the path
   */
  getDownloadPath (releaseCode) {
    return `static/releases/${releaseCode}.zip`;
  }

  /**
   * We increment the download count of the given release via POST /releases, where the payload
   * defines the album.
   * @param {string} rid is the id of the release in DB. It is not the ReleaseCode.
   */
  async addDownload (rid) {
    // Add download to DB
    const payload = { releaseID: rid };
    try {
      await callApi('POST', '/downloads/releases/', payload, null);
    } catch (err) {
      return err;
    }
  }

  /**
     * Return the download count for a given release.
     * @param {int} rid is the release ID
     * @return {int} the amount of downloads
     */
  async getDownloadCount () {
    try {
      const response = await callApi('GET', `/downloads/releases/${this.props.release.id}`, null, null);
      this.setState({ downloadCount: response.data.downloads[0].count });
    } catch (err) {
      return err;
    }
  }

  /**
     * Create a nice filename, eg. 2016-devoid of life.zip. All album files are zip files.
     * @param {datetime} date is the full release date
     * @param {string} title is the name of the album
     */
  getFilename (d, title) {
    const dateObj = new Date(d);
    const year = dateObj.getFullYear();
    let release = title.toLowerCase();
    // Remove spaces from "devoid of life" -> "devoidoflife"
    release = release.replace(/\s+/g, '');
    return `${year}-${release}.zip`;
  }

  render () {
    return (
      <div className='row'>
        <div className='col-sm-12'>
          <div className='row'>
            <div className='col-sm-12'>
              <h3 className='release-title'>
                { this.props.release.title }
                <small> { formatDateYMD(this.props.release.releaseDate) }</small>
              </h3>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-6'>
              <img
                className='release-image'
                src={ this.getCoverPath(this.props.release.releaseCode) }
                alt={ this.props.release.title }
              />
            </div>
            <div className='col-sm-6'>
              <b>Release code:</b> { this.props.release.releaseCode }<br />
              <b>Formats:</b> {
                this.props.release.formats.map((format, index) => {
                  return `${format}` + (index < this.props.release.formats.length - 1 ? ', ' : '');
                })
              }<br />
              <a
                href={ this.getDownloadPath(this.props.release.releaseCode) }
                className='release'
                onClick={ () => { this.addDownload(this.props.release.id); } }
                download={ this.getFilename(this.props.release.releaseDate, this.props.release.title) }
              >Download</a> ({ this.state.downloadCount } downloads)<hr />
              { this.props.release.credits }
            </div>
          </div>
          <p>

          </p>
          <table className='releases'>
            <tbody>
              {
                this.props.release.songs.map(function (song) {
                  return (
                    <tr key={ song.title }>
                      <td>{ song.title }</td>
                      <td>{ formatSeconds(song.duration) }</td>
                      <td><a href='javascript:;' onClick={ () => this.onOpenModal(song.id) }>Lyrics</a></td>
                    </tr>
                  );
                }, this)
              }
            </tbody>
          </table>
          <h2>Line-up</h2>
          <ul className='releases-people'>
            {
              this.props.release.people.map(person => {
                return <li key={ person.name }><b>{ person.name }</b> | { person.instruments }</li>;
              })
            }
          </ul>
          <hr />
        </div>
        <Modal open={ this.state.open } onClose={ this.onCloseModal }>
          <section className='lyricsModal'>
            <h1>{ this.state.lyrics.songTitle }</h1>
            <aside>Lyrics by: { this.state.lyrics.author }</aside>
            <p dangerouslySetInnerHTML={{ __html: this.state.lyrics.lyrics.replace(/\n/g, '<br />') }}></p>
          </section>
        </Modal>
      </div>
    );
  }
}

Release.propTypes = {
  release: PropTypes.object.isRequired
};

export default Release;
