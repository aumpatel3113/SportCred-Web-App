import React from "react";
import './FetchPosts.css';

class FetchPosts extends React.Component {
    constructor(props) {
        super(props);

        const posts = [];

        for (let i = 0; i < 5; i++) {
            posts.push({
                username: "hotwheels",
                question: "sample question?",
                post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.t"
            });
        }

        this.state = { posts };
    }

    render() {
        return (
            <div>
                {this.state.posts.map((user, index) => (
                    <div className="user-post" key={index}>
                        <div className="user-info">
                            <p key={index}>{user.username}</p>
                        </div>
                        <div className="line"></div>
                        <div className="question">
                            <p key={index}>Q: {user.question}</p>
                        </div>

                        <div className="question">
                            <p key={index}>{user.post}</p>
                        </div>

                        <div className="rating-bar"><p>Rate this post?</p></div>
                    </div>
                ))}
            </div>
        );
    }
}

export default FetchPosts;