import React from 'react';
import {render} from 'react-dom';

class Release extends React.Component {
    constructor(props) {
        super(props);
        this.getCoverPath = this.getCoverPath.bind(this);
        this.formatSeconds = this.formatSeconds.bind(this);
        this.formatReleaseDate = this.formatReleaseDate.bind(this);
        this.getMonthName = this.getMonthName.bind(this);
    }

    getCoverPath(releaseId) {
        return "static/img/releases/" + releaseId + ".jpg";
    }

    /**
     * Convert seconds to MM:SS format. We'll never have values with hours, so just MM:SS is ok
     * @param {int} s is the seconds we convert
     * @return {string} the resulting value
     */
    formatSeconds(s) {
        let minutes = Math.floor(s / 60);
        let seconds = s % 60;

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        return (minutes + ":" + seconds);
    }

    /**
     * Format the DateTime date of the album release date in a given format
     * @param {string} releaseDate in datetime format
     * @return {string} the date in the format we want
     */
    formatReleaseDate(releaseDate) {
        let dateObj = new Date(releaseDate);

        let year = dateObj.getFullYear();
        let month = dateObj.getMonth();
        let day = dateObj.getDate();

        return year + ", " + this.getMonthName(month) + " " + day;
    }

    getMonthName(month) {
        let months = new Array(12);
        months[0] = "January";
        months[1] = "February";
        months[2] = "March";
        months[3] = "April";
        months[4] = "May";
        months[5] = "June";
        months[6] = "July";
        months[7] = "August";
        months[8] = "September";
        months[9] = "October";
        months[10] = "November";
        months[11] = "December";

        return months[month];
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <h3>
                        {this.props.release.title}
                        <small> {this.formatReleaseDate(this.props.release.releaseDate)}</small>
                    </h3>
                    <img
                        src={this.getCoverPath(this.props.release.id)}
                        alt={this.props.release.title}
                    />
                    <aside>
                        {
                            this.props.release.formats.map(function(format) {
                                return format + ", "
                            })
                        }
                    </aside>
                    <p>
                        {this.props.release.credits}
                    </p>
                    <ol>
                        {
                            this.props.release.songs.map(function(song) {
                                return <li key={song.title}>{song.title} ({this.formatSeconds(song.duration)})</li>
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
