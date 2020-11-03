import React, { useEffect, useState } from "react";
import "./TheZone.css";
import axios from "axios";

const Zone = () => {

    const [posts, setPosts] = useState([]);
    const [post, setPostContent] = useState("");

    const headers = {
        'Content-Type': 'text/plain',
    }
    const [comments, setComments] = useState([]);
    const [comment, setPostComment] = useState("");

    const [agreeCount, setAgreeCount] = useState(0);
    const [disagreeCount, setDisagreeCount] = useState(0);

    const [sortBy, setSortBy] = useState('Newest');

    //Sorts posts by newest on inital render
    posts.sort(function(a, b) {
        if (sortBy === 'Newest'){
            return -(parseFloat(a.id) - parseFloat(b.id));
        } else if (sortBy === 'Popular'){
            return - ((a.agree + a.disagree) - (b.agree + b.disagree));
        }
        
    });
    
    //Rerender the posts whenever the user selects a new sorting method
    useEffect(() => {

        let sorted

        if (sortBy === 'Newest'){
            console.log("newest");
            sorted = [...posts].sort((a, b) => b.id - a.id);
        } else if (sortBy === 'Popular'){
            console.log("popular");
            sorted = [...posts].sort((a, b) => - ((a.agree + a.disagree) - (b.agree + b.disagree)));
        }

        setPosts(sorted);
    }, [sortBy]); 

    useEffect(() => {
        console.log("Rerender")
        axios.post('http://localhost:8080/api/v1/getZoneFeed', {'username': btoa(sessionStorage.getItem('username'))}, {headers})
        .then (res => {
            if (res.data) {
                for (var i = 0; i < res.data.POSTS.length; i++) {
                    console.log(res.data.POSTS[i])
                    setPosts(posts => [...posts,
                        {
                          id: res.data.POSTS[i].postID,
                          author: atob(res.data.POSTS[i].author),
                          content: res.data.POSTS[i].content,
                          commentfeed: res.data.POSTS[i].comments,
                          agree: res.data.POSTS[i].likes,
                          disagree: res.data.POSTS[i].dislikes
                        }
                    ]);
                }
            }
        })
        .catch(err => {
            console.log(err)
        })
    }, [setPosts], [setComments])

    const addPost = event => {
        event.preventDefault();
        if (post) {
        const url = 'http://localhost:8080/api/v1/addZonePost'
        const headers = {
            'Content-Type': 'text/plain',
        }
        axios.post(url, { 'author': btoa(sessionStorage.getItem('username')), 'content': post}, { headers })
        .then(res => {

                //console.log(res.status)

                let postId = res.data.postID;
                setPosts([
                    ...posts,
                    {
                      id: postId,
                      author: sessionStorage.getItem("username"),
                      content: post,
                      commentfeed: [],
                      agree: 0,
                      disagree: 0
                    }
                  ]);
                  setAgreeCount(0);
                  setDisagreeCount(0);

                  console.log(postId);
                  setPostContent("");
            })
            .catch(err => {
                console.log(err);
            })
        console.log(post)
    }
    else {
       alert("Can't submit an empty post!")
    }}

    const addLike = (event, pid, post) => {
        event.preventDefault();
        console.log("like")
        const url = 'http://localhost:8080/api/v1/rateZonePost'
        const headers = {
            'Content-Type': 'text/plain',
        }
        axios.post(url, { 'username': btoa(sessionStorage.getItem('username')), 'postID':  pid, 'likePost': true}, { headers })
        .then(res => {
            setAgreeCount(post.agree = post.agree + 1);
        })
        .catch(err => {
            console.log(err.status);
            console.log(err.code);
            alert("You have already chosen to like/dislike.")
        })
    }


    const addDislike = (event, pid, post) => {
        event.preventDefault();
        console.log("dislike")
        const url = 'http://localhost:8080/api/v1/rateZonePost'
        const headers = {
            'Content-Type': 'text/plain',
        }
        axios.post(url, { 'username': btoa(sessionStorage.getItem('username')), 'postID':  pid, 'dislikePost': true}, { headers })
        .then(res => {
            console.log(res.status)
            setDisagreeCount(post.disagree = post.disagree + 1);
        })
        .catch(err => {
            console.log(err.status);
            alert("You have already chosen to like/dislike.")
        })
    }


    const addComment = (event, pid, post) => {
        event.preventDefault();
        if (comment) {
        const url = 'http://localhost:8080/api/v1/addZoneComment'
        const headers = {
            'Content-Type': 'text/plain',
        }
        axios.post(url, {'username': btoa(sessionStorage.getItem('username')), 'postID':  pid, 'content': comment}, { headers })
        .then(res => {
            console.log(res.status)
            let commentId = res.data.commentID;
            setComments(post.commentfeed.push(comment));
            console.log(commentId);
            setPostComment("");
        })
        .catch(err => {
            console.log(err);
        })
    console.log(comment)
}
else {
   alert("Can't submit an empty comment!")
}}


      return (
        <div className="zoneContainer">
            <h7>WHAT'S ON YOUR MIND, <b>{sessionStorage.getItem('username')}</b>?
            </h7>
            <textarea
            placeholder="Write a post...."
            name="post"
            type="text"
            value={post}
            onChange={e => setPostContent(e.target.value)}
          />
            <button className="button1" onChange={e => setPostContent(e.target.value)} onClick={addPost}>
                SUBMIT
            </button>

            <select size="1" className="button2" onChange={(e) => setSortBy(e.target.value)}>
                <option value='Newest'>Newest</option>
                <option value='Popular'>Popular</option>
            </select>

          <h3>THE ZONE </h3>

          <br/>

          {posts.map(post => (
            <div className="blogpost" key={post.id}>
                <div className="user-info">
                    <p key={post.id}>  <i>posted by: </i>{post.author}</p>
                </div>
                
                <div className="line">
                </div>

                <div className="content">
                    <p key={post.id}> {post.content}</p>
                </div>

                <div className="rate">
                <button className="agree-button" onClick={(event) => addLike(event, post.id, post)}>
                    Agree | {post.agree}
                </button>
                
                <button className="disagree-button" onClick={event => addDislike(event, post.id, post)}>
                    Disagree | {post.disagree}
                </button>
                </div>

                <hr></hr>
                
                <h8> <b>comments:</b> </h8>

                <div className="comment">
                    
                {post.commentfeed.map(comment => (
                <div className="comment-info">
                <p> {comment} </p> 
                </div>
                ))}
                
                <textarea
                placeholder="Write a comment...."
                name="comment"
                type="text"
                value={comment}
                onChange={e => setPostComment(e.target.value)}
                />
                
                <button className="comment-button" onChange={e => setPostContent(e.target.value)} onClick={event => addComment(event, post.id, post)}>
                    COMMENT
                </button>
                </div>
            </div>
        ))}
    </div>    
    );
}

export default Zone;