import React from "react";
import './FetchPosts.css';
import axios from 'axios'

class FetchPosts extends React.Component {
    constructor(props) {
        super(props);

        // groupInfo[0] indicates whether a group exists
        // groupInfo[1] is the question being answered by the group
        const groupInfo = [1]

        const posts = [];
        const url = 'http://localhost:8080/api/v1/sendDebateGroup'
        const headers = {
            'Content-Type': 'text/plain',
        }

        axios.post(url, { 'username': btoa(sessionStorage.getItem('username')) }, { headers }
        )
            .then(res => {
                let debateGroup = res.data.postGroup;
                // console.log(debateGroup)

                if (debateGroup.length > 0) {
                    groupInfo.push(debateGroup[0].question)
                    for (let i = 0; i < debateGroup.length; i++) {

                        posts.push({
                            username: atob(debateGroup[i].user),
                            question: debateGroup[i].question,
                            post: debateGroup[i].post
                        });
                    }
                } else {
                    groupInfo[0] = 0
                }
            })
            .catch(err => {
                //console.log(err);
            })

        //console.log(groupInfo)
        this.state = { posts, groupInfo };
    }

    render() {
        return (
            <div className="fetchposts">
                { this.state.groupInfo[0] === 1 ? (
                    <div>
                        <div className="question-answered">
                            <h2>The question they answered was</h2>
                            <h1>{this.state.groupInfo[1]}</h1>
                            <h4>this is what they said..</h4>
                        </div>
                        {this.state.posts.map((user, index) => (
                            <div className="user-post" key={index}>
                                <div className="user-info">
                                    <p key={index}>{user.username}</p>
                                </div>
                                <div className="user-post-line"></div>
                                {/* <div className="question">
                                    <p key={index}>Q: {user.question}</p>
                                </div> */}

                                <div className="question">
                                    <p key={index}>{user.post}</p>
                                </div>

                                <div className="rating-bar"><p>Rate this post?</p></div>
                            </div>
                        ))}
                    </div>
                ) : (
                        <>
                            <div className="group-dne">
                                <h1>Sorry, no groups were found..</h1>
                                <h2>Come back later!</h2>
                            </div>
                        </>
                    )}
            </div>
        );
    }
}

export default FetchPosts;