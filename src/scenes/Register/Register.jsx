import React from 'react';
import {render} from 'react-dom';

import RegisterForm from './components/RegisterForm/RegisterForm.jsx';

class Register extends React.Component {
    render() {
        return (
            <div id="register">
                <h2>Register</h2>
                <p>Registered users get a bunch of extra features:</p>
                <ul>
                    <li>Can comment on News</li>
                    <li>Can comment on Releases</li>
                    <li>Can comment on Songs</li>
                    <li>Can comment on Shows</li>
                    <li>Can comment on Photos</li>
                    <li>Can comment on Shop items</li>
                    <li>Can vote Photos</li>
                    <li>Can vote Shop items</li>
                    <li>Can post in Guestbook with an avatar and the display name is reserved</li>
                </ul>
                <hr />
                <RegisterForm />
            </div>
        );
    }
}

export default Register;
