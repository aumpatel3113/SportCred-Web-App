import React from "react";
import './FetchRadar.css';
import axios from 'axios'

class FetchRadar extends React.Component {
    constructor(props) {

        super(props);

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

                this.setState({ state: radar });
            })
            .catch(err => {
                // console.log(err);
            })

        this.state = { radar };


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

    reloadRadar(i){
        this.state.radar = this.state.radar.slice(0, i).concat(this.state.radar.slice(i + 1, this.state.radar.length))
        this.setState({state: this.state})
    }

    render() {
        return (
            <div className="fetch-radar">
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
                                            <p key={index}>{user.username} - {user.acs} ({user.tier})</p>
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
                                                    <p key={index}>{user.username} - {user.acs} ({user.tier})</p>
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
            </div>
        );
    }
}

export default FetchRadar;