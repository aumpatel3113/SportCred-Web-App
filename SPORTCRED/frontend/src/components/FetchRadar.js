import React from "react";
import './FetchRadar.css';
import axios from 'axios'

class FetchRadar extends React.Component {
    constructor(props) {

        super(props);

        const profile = [false, {}];
        const radar = [];
        const url = 'http://localhost:8080/api/v1/getRadar'
        const headers = {
            'Content-Type': 'text/plain',
        }

        axios.post(url, { 'username': btoa(sessionStorage.getItem('username')) }, { headers }
        )
            .then(res => {
                let radarGroup = res.data.radar;

                for (let i = 0; i < radarGroup.length; i++) {
                    radar.push({
                        username: atob(radarGroup[i].username),
                        tier: radarGroup[i].title,
                        acs: radarGroup[i].ACS,
                        pic: radarGroup[i].picture
                    });
                }

                for (let i = 0; i < radar.length; i++) {
                    if (radar[i].pic === './kobe.jpg') {
                        radar[i].pic = require('../kobe.jpg')
                    } else if (radar[i].pic === './lebron.jpg') {
                        radar[i].pic = require('../lebron.jpg')
                    } else {
                        radar[i].pic = require('../michaeljordan.jpg')
                    }
                }

                this.setState({ state: radar, profile });
            })
            .catch(err => {
                // console.log(err);
            })

        this.state = { radar, profile };

    }

    deleteUser = (index) => {
        const url = "http://localhost:8080/api/v1/editRadar";
        const headers = {
            'Content-Type': 'text/plain',
        }

        axios.post(url, { 'username': btoa(sessionStorage.getItem("username")), 'searchedUser': btoa(this.state.radar[index].username), 'add': false }, { headers }
        )
            .then((res) => {
            })
            .catch(err => {
            })

        this.reloadRadar(index)
    }

    reloadRadar(i) {
        this.state.radar = this.state.radar.slice(0, i).concat(this.state.radar.slice(i + 1, this.state.radar.length))
        this.setState({ state: this.state })
    }

    viewProfile(i) {
        this.getProfile(i)
        this.setState({ state: this.state })
    }

    getProfile(i) {
        const url = "http://localhost:8080/api/v1/getProfile";
        const headers = {
            'Content-Type': 'text/plain',
        }

        axios.post(url, { 'username': btoa(this.state.radar[i].username) }, { headers }
        )
            .then((res) => {
                let profileInfo = res.data;

                this.state.profile[1] = {
                    username: atob(profileInfo.username),
                    tier: profileInfo.title,
                    acs: profileInfo.ACS,
                    pic: profileInfo.picture,
                    q1: profileInfo.Q1,
                    q2: profileInfo.Q2,
                    q3: profileInfo.Q3,
                    q4: profileInfo.Q4,
                    q5: profileInfo.Q5,
                    bio: profileInfo.bio
                };

                if (this.state.profile[1].pic === './kobe.jpg') {
                    this.state.profile[1].pic = require('../kobe.jpg')
                } else if (this.state.profile[1].pic === './lebron.jpg') {
                    this.state.profile[1].pic = require('../lebron.jpg')
                } else {
                    this.state.profile[1].pic = require('../michaeljordan.jpg')
                }

                this.setState({ state: this.state });
            })
            .catch(err => {
            })

        this.state.profile[0] = true;
        this.setState({ state: this.state });
    }

    backToRadar() {
        console.log("hello")
        this.state.profile[0] = false;
        this.setState({ state: this.state })
    }

    render() {
        return (
            <div className="fetch-radar">

                { this.state.profile[0] ? (
                    <div className="view-profile">
                        <div className="profile-box">
                            <div className="profile-header-container">
                                <div className="profile-pic">
                                    <img src={this.state.profile[1].pic} className="profile-pic" />
                                </div>
                                <div className="profile-main-info">
                                    <div className="profile-main-info-text">
                                        <p>{this.state.profile[1].username} - {this.state.profile[1].acs} <br></br><span className="profile-tier">({this.state.profile[1].tier})</span></p>
                                    </div>

                                </div>
                            </div>

                            <div className="rest-of-profile">
                                <div className="bio">
                                    <p>{this.state.profile[1].bio}</p>
                                </div>

                                <div className="profile-questions">
                                    <p><span class="about-profile">About</span>
                                <span class="br-bigger"></span>
                                        <span class="question">Fav. Sport is </span>{this.state.profile[1].q1}
                                        <span class="br"></span>
                                        <span class="question">Highest Level of Sport played is </span>{this.state.profile[1].q2}
                                        <span class="br"></span>
                                        <span class="question">Fav. Team is the </span>{this.state.profile[1].q4}
                                        <span class="br"></span>
                                        <span class="question">Wants to Learn </span>{this.state.profile[1].q5}
                                        <span class="br"></span>
                                        <span class="question">Age </span>{this.state.profile[1].q3}</p>
                                </div>
                            </div>



                            <div className="back-to-radar">
                                <button className="back-to-radar" onClick={() => this.backToRadar()}>back</button>
                            </div>
                        </div>
                    </div>
                ) : (
                        <>
                            { this.state.radar.length > 0 ? (
                                <div className="has-radar">
                                    { this.state.radar.length > 3 ? (
                                        <div className="users-map">
                                            {this.state.radar.map((user, index) => (
                                                <div className="container-user" key={index}>
                                                    <div className="user-pic">
                                                        <img src={user.pic} className="user-pic" />
                                                    </div>
                                                    <div className="radar-user-info">
                                                        <div className="user-info-content">
                                                            <a href='#' onClick={() => this.viewProfile(index)} key={index}>{user.username} - {user.acs}</a>
                                                            <p>({user.tier})</p>
                                                        </div>
                                                    </div>
                                                    <button className="delete-user-btn" onClick={() => this.deleteUser(index)}>x</button>
                                                </div>

                                            ))}
                                        </div>
                                    ) : (
                                            <>
                                                <div className="users-map-small">
                                                    {this.state.radar.map((user, index) => (
                                                        <div className="container-user" key={index}>
                                                            <div className="user-pic">
                                                                <img src={user.pic} className="user-pic" />
                                                            </div>
                                                            <div className="radar-user-info">
                                                                <div className="user-info-content">
                                                                    <a href='#' onClick={() => this.viewProfile(index)} key={index}>{user.username} - {user.acs} </a>
                                                                    <p>({user.tier})</p>
                                                                </div>

                                                            </div>
                                                            <button className="delete-user-btn" onClick={() => this.deleteUser(index)}>x</button>
                                                        </div>

                                                    ))}
                                                </div>
                                            </>
                                        )}
                                </div>


                            ) : (
                                    <>
                                        <div className="empty-radar">
                                            <p>Your radar's looking a bit empty..</p>
                                        </div>
                                    </>
                                )}
                        </>
                    )}


            </div>
        );
    }


}

export default FetchRadar;