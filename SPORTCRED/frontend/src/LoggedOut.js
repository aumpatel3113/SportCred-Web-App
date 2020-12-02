import React from 'react';
import './LoggedOut.css';
import Logo from './SPORTCRED_Logo.png';

export default function LoggedOut() {

    return (
        <div className="logged-out-page">
            <header className="loggged-out-header">
              <title>Logged Out</title>
            </header>
            <body>
                <div>
                    <img src={Logo} className="sportcred-logo" alt="SPORTCRED Logo"></img>
                    <p className="response">You have been logged out. Open SPORTCRED in a new window to log back in.</p>
                </div>
            </body>
        </div>
    );
}