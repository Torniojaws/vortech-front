import React from 'react';

import Externals from './components/Externals/Externals.jsx';

class WelcomePage extends React.Component {
  render () {
    return (
      <div id='page'>
        <h1 className='vortech-text'>Vortech</h1>
        <p>Fast. Futuristic. Electrified.</p>
        <hr/>

        <p>A new EP, Impenitence, has just been released! Check it out in the News section.</p>
        <p>We are also currently recording the vocals for our 8th full length album, due out in
        late 2019! It will contain a heavy dose of industrial-tinged death metal for your listening
        pleasure. The theme is placed far in the future, in a Mad Max-esque hi-tech dystopia.</p>
        <p>This brand new website still has some things left to do, so a lot of things are
        still being added and more things will appear over time!</p>

        <hr/>
        You can also find us at:<br />
        <Externals />
      </div>
    );
  }
}

export default WelcomePage;
