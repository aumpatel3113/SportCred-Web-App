import React, { useEffect, useState } from "react";
import "./RadarBox.css";
import axios from 'axios'

const RadarBox = () => {
    const [viewRadar, setViewRadar] = useState(true)

    const setViewRadarTrue = () => {
        setViewRadar(true)
    };

    const setViewRadarFalse = () => {
        setViewRadar(false)
    };


    return (
        <div className="radar-box">

            <div className="radar-options">
                <button className="show-radar-btn" onClick={setViewRadarTrue}>Your Radar</button>
                <button className="add-radar-btn" onClick={setViewRadarFalse}>Add to Radar</button>
            </div>


            { viewRadar ? (
                <div className="view-radar">
                    <h1>showing your radar</h1>
                </div>
            ) : (
                    <>
                        <div className="add-to-radar">
                            <h1>search someone</h1>
                        </div>
                    </>
                )}



        </div>
    );
}

export default RadarBox;