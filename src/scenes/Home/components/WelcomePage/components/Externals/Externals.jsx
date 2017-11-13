import React from 'react';
import {render} from 'react-dom';

class Externals extends React.Component {
    render() {
        const externals = [
            {url: "https://vortech.bandcamp.com", logo: "bandcamp.jpg", name: "BandCamp"},
            {url: "https://www.facebook.com/vortechmetal", logo: "facebook.jpg", name: "Facebook"},
            {url: "https://www.last.fm/music/Vortech", logo: "lastfm.jpg", name: "Last.FM"},
            {url: "https://www.soundcloud.com/vortechmetal", logo: "soundcloud.jpg", name: "SoundCloud"},
            {url: "https://www.twiter.com/vortechmetal", logo: "twitter.jpg", name: "Twitter"},
            {url: "https://www.youtube.com/vortechband", logo: "youtube.jpg", name: "YouTube"}
        ];

        return externals.map((ext) => {
            return <a key={ext.logo} href={ext.url}><img className="external" src={"static/img/external/" + ext.logo} alt={ext.name} /></a>;
        });
    }
}

export default Externals;
