import React, { useEffect, useState } from "react";
import "./RadarBox.css";
import FetchRadar from "./FetchRadar"
import axios from 'axios'

const RadarBox = () => {
    const [viewRadar, setViewRadar] = useState(true)
    const [search, setSearch] = useState('')
    const [found, setFound] = useState(-1)

    const [added, setAdded] = useState(0)

    const [radarSize, setRadarSize] = useState(-1)

    const [searchErrorMsg, setSearchErrorMsg] = useState('')

    const [searchedUsername, setSearchedUsername] = useState()
    const [searchedUserACS, setSearchedUserACS] = useState()
    const [searchedUserTier, setSearchedUserTier] = useState()
    const [searchedUserPic, setSearchedUserPic] = useState()

    const setViewRadarTrue = () => {
        setViewRadar(true)
        setFound(-1)
        setSearch('')
    };

    const setViewRadarFalse = () => {
        setViewRadar(false)
    };

    // useEffect(() => {
    //     const url = 'http://localhost:8080/api/v1/radarSize'
    //     const headers = {
    //         'Content-Type': 'text/plain',
    //     }

    //     axios.post(url, { 'username': btoa(sessionStorage.getItem("username")) }, { headers }
    //     )
    //         .then(res => {
    //             let radarSize = res.data.radarSize
    //             setRadarSize(radarSize)
    //         })
    //         .catch(err => {

    //         })
    // }, [])

    const searchForUser = () => {
        if (search !== '') {

            setAdded(0)

            const url = 'http://localhost:8080/api/v1/searchRadar'
            const headers = {
                'Content-Type': 'text/plain',
            }

            axios.post(url, { 'username': btoa(sessionStorage.getItem("username")), 'searchedUser': btoa(search) }, { headers }
            )
                .then(res => {
                    if (res.status === 200) {
                        setFound(1)

                        setSearchedUsername(search)
                        setSearchedUserACSInfo()
                        setSearchedUserPicture()

                    } else if (res.status === 202) {
                        setFound(0)
                        setSearchErrorMsg('You can\'t add yourself.')
                    } else {
                        setFound(0)
                        setSearchErrorMsg('No user found...')
                    }
                })
                .catch(err => {

                })
        }

    };

    const setSearchedUserACSInfo = () => {
        const url = "http://localhost:8080/api/v1/getACSScore";
        const headers = {
            'Content-Type': 'text/plain',
        }

        axios.post(url, { username: btoa(search) }, { headers }
        )
            .then((res) => {
                let acsscore = res.data.ACS;
                let acsrank = res.data.rank;

                setSearchedUserACS(acsscore)
                setSearchedUserTier(acsrank)
            })
            .catch(err => {

            })
    }

    const setSearchedUserPicture = () => {
        const url = "http://localhost:8080/api/v1/getProfilePicture";
        const headers = {
            'Content-Type': 'text/plain',
        }

        axios.post(url, { username: btoa(search) }, { headers }
        )
            .then((res) => {
                let pic = res.data;

                if (pic === './kobe.jpg') {
                    setSearchedUserPic(require('../kobe.jpg'))
                } else if (pic === './lebron.jpg') {
                    setSearchedUserPic(require('../lebron.jpg'))
                } else {
                    setSearchedUserPic(require('../michaeljordan.jpg'))
                }

            })
            .catch(err => {

            })
    }

    const addUser = () => {
        addUserForReal()
        setAdded(1)
        // setRadarSize(radarSize + 1)
    }

    const removeUser = () => {
        setRadarSize(radarSize - 1)
    }

    const addUserForReal = () => {
        const url = "http://localhost:8080/api/v1/editRadar";
        const headers = {
            'Content-Type': 'text/plain',
        }

        axios.post(url, { 'username': btoa(sessionStorage.getItem("username")), 'searchedUser': btoa(searchedUsername), 'add': true }, { headers }
        )
            .then((res) => {
                // console.log(res.status)
            })
            .catch(err => {
            })
    }

    return (
        <div className="radar-box">

            <div className="radar-options">
                <button className="show-radar-btn" onClick={setViewRadarTrue}>Your Radar</button>
                <button className="add-radar-btn" onClick={setViewRadarFalse}>Expand Radar</button>
            </div>

            { viewRadar ? (
                <div className="view-radar">
                    <FetchRadar />
                </div>
            ) : (
                    <>
                        <div className="add-to-radar">
                            <textarea
                                placeholder="Find User"
                                name="search"
                                id="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={(event) => {
                                    if (event.key === 'Enter') {
                                        event.preventDefault()
                                        searchForUser()
                                    }
                                }}
                            />

                            <button className="search-user-btn" onClick={searchForUser}>Find</button>

                        </div>

                        { found !== -1 ? (
                            <div className="searched">
                                { found === 1 ? (
                                    <div className="found-user">

                                        { added === 0 ? (
                                            <div className="container-found-user">
                                                <div className="searched-user-pic">
                                                    <img src={searchedUserPic} className="-searched-user-pic" />
                                                </div>
                                                <div className="searched-user-info">
                                                    <p>{searchedUsername} - {searchedUserACS} <span className="user-tier">({searchedUserTier})</span></p>
                                                </div>
                                                <button className="add-user-btn" onClick={addUser}>Add</button>
                                            </div>
                                        ) : (
                                                <>
                                                    <div className="container-added-user">
                                                        <div className="searched-user-pic">
                                                            <img src={searchedUserPic} className="-searched-user-pic" />
                                                        </div>
                                                        <div className="searched-user-info">
                                                            <p>{searchedUsername} - {searchedUserACS} <span className="user-tier">({searchedUserTier})</span></p>
                                                        </div>
                                                        <button className="add-user-btn">Added!</button>
                                                    </div>
                                                </>
                                            )}
                                    </div>
                                ) : (
                                        <>
                                            <div className="unknown-user">
                                                <p>{searchErrorMsg}</p>
                                            </div>
                                        </>
                                    )}
                            </div>
                        ) : (
                                <></>
                            )}

                    </>
                )}



        </div>
    );

    
}

export default RadarBox ;