import React from 'react';
import {render} from 'react-dom';

import Externals from './components/Externals/Externals.jsx';

class WelcomePage extends React.Component {
    render() {
        return (
            <div id="page">
                <h1 className="vortech-text">Vortech</h1>
                <p>Fast. Futuristic. Electrified.</p>

                <hr/>
                <p>We are currently finishing the preproduction for a new album due out in 2018!
                It will contain a heavy dose of industrial-tinged death metal for your listening
                pleasure. The recording is partly underway and will progress through the end of the
                year 2017 and in early 2018.</p>
                <p>As you might tell, we have launched a brand new website, so a lot of things are
                still being added and more things will appear all the time!</p>

                <hr/>
                You can also find us at:<br />
                <Externals />
            </div>
        );
    }
}

export default WelcomePage;
