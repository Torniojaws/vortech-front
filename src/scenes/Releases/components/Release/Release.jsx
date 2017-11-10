import React from 'react';
import {render} from 'react-dom';

import {formatDateYMD} from '../../../../services/Datetime/Datetime.js';
import {formatSeconds} from '../../../../services/Datetime/Datetime.js';

class Release extends React.Component {
    constructor(props) {
        super(props);
        this.getCoverPath = this.getCoverPath.bind(this);
    }

    /**
     * Return the path to the album cover, where the cover is identified by the release Code, eg.
     * static/img/releases/VOR001.jpg
     * @param {string} releaseCode is the identifier
     * @return {string} the path to the image
     */
    getCoverPath(releaseCode) {
        return "static/img/releases/" + releaseCode + ".jpg";
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <h3>
                        {this.props.release.title}
                        <small> {formatDateYMD(this.props.release.releaseDate)}</small>
                    </h3>
                    <img
                        src={this.getCoverPath(this.props.release.releaseCode)}
                        alt={this.props.release.title}
                    />
                    <aside>
                        <p>{this.props.release.releaseCode} -
                        {
                            this.props.release.formats.map(function(format) {
                                return format + ", "
                            })
                        }</p>
                    </aside>
                    <p>
                        {this.props.release.credits}
                    </p>
                    <ol>
                        {
                            this.props.release.songs.map(function(song) {
                                return <li key={song.title}>{song.title} ({formatSeconds(song.duration)})</li>
                            }, this)
                        }
                    </ol>
                    <ul>
                        {
                            this.props.release.people.map(function(person) {
                                return <li key={person.name}>{person.name} - {person.instruments}</li>
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default Release;
