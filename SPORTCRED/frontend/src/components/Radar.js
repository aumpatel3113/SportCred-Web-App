import React from 'react';
import RadarBox from './RadarBox';

export default ({ close }) => (

    <div className="Container">
        <div className="radar-modal">
            <a className="close" onClick={close}>x</a>
            <div className="header">
                <h1>Radar</h1>

            </div>
            <div className="content">
                <RadarBox />
            </div>
        </div>
    </div>
);