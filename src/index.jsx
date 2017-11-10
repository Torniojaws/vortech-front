import React from 'react';
import {render} from 'react-dom';
import {
    BrowserRouter as Router,
    Link,
    Switch,
    Route
} from 'react-router-dom';

// General stuff
import Footer from './scenes/Home/components/Footer/Footer.jsx';
import Home from './scenes/Home/Home.jsx';
import Login from './scenes/Login/Login.jsx';
import WelcomePage from './scenes/Home/components/WelcomePage/WelcomePage.jsx';
import VisitorCounter from './data/VisitorCounter/VisitorCounter.jsx';

// Main pages
import News from './scenes/News/News.jsx';
import Releases from './scenes/Releases/Releases.jsx';
import Biography from './scenes/Biography/Biography.jsx';
import Shows from './scenes/Shows/Shows.jsx';

// Login / Logout
import Register from './scenes/Register/Register.jsx';
import Profile from './scenes/Profile/Profile.jsx';
import Logout from './scenes/Logout/Logout.jsx';

// Plugins and styles
require('es6-promise/auto');
require('./main.scss');

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Router>
                    <div className="row main-box">
                        <div className="col-sm-4 center">
                            <nav id="menu">
                                <img src="static/img/logo.png" alt="Vortech" className="vortech-logo" />
                                <ul className="list-unstyled menulist">
                                    <li><Link to="/" className="menu">Home</Link></li>
                                    <li><Link to="/news" className="menu">News</Link></li>
                                    <li><Link to="/releases" className="menu">Releases</Link></li>
                                    <li><Link to="/biography" className="menu">Biography</Link></li>
                                    <li><Link to="/shows" className="menu">Shows</Link></li>
                                </ul>
                                <section id="login">
                                    <Login />
                                </section>
                                <br />
                                <VisitorCounter />
                            </nav>
                        </div>
                        <div className="col-sm-8">
                            <Route exact={true} path="/" component={WelcomePage} />
                            <Route path="/news" component={News} />
                            <Route path="/releases" component={Releases} />
                            <Route path="/biography" component={Biography} />
                            <Route path="/shows" component={Shows} />
                            <Route path="/register" component={Register} />
                            <Route path="/profile" component={Profile} />
                            <Route path="/logout" component={Logout} />
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
};

render(
    <App />,
    document.getElementById('app')
);
