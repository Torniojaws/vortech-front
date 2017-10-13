import React from 'react';
import {render} from 'react-dom';
import {
    BrowserRouter as Router,
    Link,
    Switch,
    Route
} from 'react-router-dom';

// General stuff
import Home from './scenes/Home/Home.jsx';
import WelcomePage from './scenes/Home/components/WelcomePage/WelcomePage.jsx';
import Footer from './scenes/Home/components/Footer/Footer.jsx';

// Main pages
import News from './scenes/News/News.jsx';

require('./main.scss');

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Router>
                    <div className="routerNeedsThis">
                        <nav id="menu" className="row">
                            <ul className="menulist">
                                <li><Link to="/" className="menu">Home</Link></li>
                                <li><Link to="/news" className="menu">News</Link></li>
                            </ul>
                        </nav>
                        <Route exact={true} path="/" component={WelcomePage} />
                        <Route path="/news" component={News} />
                    </div>
                </Router>
                <Footer />
            </div>
        );
    }
};

render(
    <App />,
    document.getElementById('app')
);
