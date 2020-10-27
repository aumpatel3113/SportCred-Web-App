import "./DebatePage.css";
import React, { useEffect, useState } from 'react';
import Post from './Post';
import axios from 'axios'
import Popup from "reactjs-popup";
import FetchPosts from "./FetchPosts";

const DebatePage = () => {

    var currentQuestions = []
    currentQuestions[0] = "Sample question."
    currentQuestions[1] = "Another sample."

    return (
        <div className="debates">
            <div className="questions-section">
                <div className="current-questions">
                    <h1>Today's questions to debate in {sessionStorage.getItem("acsrank")} are..</h1>
                    <div className="line"></div>
                    <p>1. {currentQuestions[0]}</p>
                    <p>2. {currentQuestions[1]}</p>
                </div>

                <div className="make-post">
                    <Popup modal trigger={<button>Post your thoughts!</button>}>
                        {close => <Post close={close} />}
                    </Popup>
                </div>
            </div>
            {/* <div className="line-between"></div> */}
            <div className="posts">
                <h1>Here's what others think. Rate them!</h1>
                <div className="line-posts"></div>
                <div className="fetched-posts">< FetchPosts /></div>
            </div>
        </div>
    )

}

export default DebatePage;