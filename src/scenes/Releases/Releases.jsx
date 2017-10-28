import React from 'react';
import {render} from 'react-dom';

import AllReleases from './components/AllReleases/AllReleases.jsx';

class Releases extends React.Component {
    render() {
        return (
            <div>
                <h2>Releases</h2>
                <AllReleases />
            </div>
        );
    }
}

export default Releases;
