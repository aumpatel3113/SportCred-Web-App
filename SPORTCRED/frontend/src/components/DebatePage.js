import "./DebatePage.css";
import React, { useEffect, useState } from 'react';
import Post from './Post';
import axios from 'axios'
import Popup from "reactjs-popup";
import FetchPosts from "./FetchPosts";

const DebatePage = () => {

    const [question1, setQuestion1] = useState()
    const [question2, setQuestion2] = useState()

    useEffect(() => {

        const url = 'http://localhost:8080/api/v1/getCurrentQuestions'
        const headers = {
            'Content-Type': 'text/plain',
        }

        axios.post(url, { 'score': sessionStorage.getItem('acsscore') }, { headers }
        )
            .then(res => {
                let debateQuestions = res.data.questions;
                //console.log(debateQuestions[0], debateQuestions[1])
                setQuestion1(debateQuestions[0])
                setQuestion2(debateQuestions[1])
            })
            .catch(err => {
                //console.log(err);
            })
    }, [])

    var currentQuestions = [question1, question2]

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