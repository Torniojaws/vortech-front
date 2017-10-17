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

// Main pages
import News from './scenes/News/News.jsx';

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
                                </ul>
                                <section id="login">
                                    <Login />
                                </section>
                            </nav>
                        </div>
                        <div className="col-sm-8">
                            <Route exact={true} path="/" component={WelcomePage} />
                            <Route path="/news" component={News} />
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
