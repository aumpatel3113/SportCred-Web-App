import React from 'react';
import PostBox from './PostBox';

export default ({ close }) => (

    <div className="Container">
        <div className="modal">
            <a className="close" onClick={close}>x</a>
            <div className="header">
                <h1>Make a Post</h1>

            </div>
            <div className="content">
                <PostBox />
            </div>
        </div>
    </div>
);