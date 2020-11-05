import React, { useEffect, useState } from "react";
import "./PostBox.css";
import axios from 'axios'

const PostBox = () => {
    const [alreadyPosted, setAlreadyPosted] = useState(false)

    useEffect(() => {

        const url = 'http://localhost:8080/api/v1/validateDebate'
        const headers = {
            'Content-Type': 'text/plain',
        }

        axios.post(url, { 'username': btoa(sessionStorage.getItem("username")) }, { headers }
        )
            .then(res => {
                let isValid = res.data.isValid;
                //console.log(isValid)
                setAlreadyPosted(isValid)
            })
            .catch(err => {
                //console.log(err);
            })
    }, [])

    const [post, setPost] = useState('')
    const [question, setQuestion] = useState(-1)
    const [successfulPost, setSuccessfulPost] = useState(false)

    const [q1, setQ1] = useState()
    const [q2, setQ2] = useState()

    useEffect(() => {

        const url = 'http://localhost:8080/api/v1/getCurrentQuestions'
        const headers = {
            'Content-Type': 'text/plain',
        }

        axios.post(url, { 'score': sessionStorage.getItem('acsscore') }, { headers }
        )
            .then(res => {
                let debateQuestions = res.data.questions;
                // console.log(debateQuestions[0], debateQuestions[1])
                setQ1(debateQuestions[0])
                setQ2(debateQuestions[1])
            })
            .catch(err => {
                //console.log(err);
            })


    }, [])

    var currentQuestions = [q1, q2]

    const submitPost = (e) => {
        e.preventDefault();

        const data = {
            username: btoa(sessionStorage.getItem("username")),
            post: post
        };

        const url = 'http://localhost:8080/api/v1/acceptNewDebate'
        const headers = {
            'Content-Type': 'text/plain',
        }

        axios.post(url, {
            'username': btoa(sessionStorage.getItem("username")), 'post': post
            , 'question': currentQuestions[question - 1]
        }, { headers }
        )
            .then(res => {
                //console.log(res.status)
            })
            .catch(err => {
                //console.log(err);
            })

        setSuccessfulPost(true)
    };

    const setQuestion1 = () => {

        setQuestion(1)
    };

    const setQuestion2 = () => {
        setQuestion(2)
    };

    

    return (
        <div className="post-box">

            { alreadyPosted === false ? (
                <div className="already-posted">
                    <h1>You've already posted today!</h1>
                    <div className="line-posted"></div>
                    <p>You can only make a post on 1 question per day.</p>
                </div>
            ) : (
                    <>
                        {successfulPost ? (
                            <div className="success">
                                <p>Your thoughts on</p>
                                <h1>{currentQuestions[question - 1]}</h1>
                                <p>have been posted!</p>
                            </div>
                        ) : (
                                <>
                                    <textarea
                                        placeholder="What's your opinion?"
                                        name="post"
                                        id="post"
                                        value={post}
                                        onChange={(e) => setPost(e.target.value)}
                                    />
                                    <div className="question-select">
                                        <button className="q1" onClick={setQuestion1}>1</button>
                                        <button className="q2" onClick={setQuestion2}>2</button>
                                    </div>

                                    {question === -1 ? (
                                        <div className="selected"><p>Select the question you're debating on above.</p></div>

                                    ) : (
                                            <>
                                                <div className="selected"><p>{currentQuestions[question - 1]}</p></div>
                                            </>
                                        )}

                                    {question === -1 || post === '' ? (
                                        <div className="invalid-post"><button>Post!</button></div>
                                    ) : (
                                            <>
                                                <div className="valid-post"><button onClick={submitPost}>Post!</button></div>
                                            </>
                                        )}


                                </>
                            )}
                    </>
                )}



        </div>
    );
}

export default PostBox;