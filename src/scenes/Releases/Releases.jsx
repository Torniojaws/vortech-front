import React from 'react';
import AllReleases from './components/AllReleases/AllReleases.jsx';

class Releases extends React.Component {
  render () {
    return (
      <div>
        <h2>Releases</h2>
        <AllReleases />
      </div>
    );
  }
}

export default Releases;
