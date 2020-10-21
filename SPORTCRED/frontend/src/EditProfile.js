import React, { useState } from "react";
import "./EditProfile.css";
// import axios from "axios";

const EditProfile = () => {
  const [bio, setBio] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handlePassword(event) {
    event.preventDefault();
    // check that all fields were filled
    var fill = (currentPassword !== "") &&
      (newPassword !== "") &&
      (confirmPassword !== "")
    // check password validity
    var valid = (newPassword === confirmPassword) &&
      (newPassword !== currentPassword) 
    
    if (fill) {
      if (valid) {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
          if (xhr.responseText.length > 0) {
            alert('Current password is invalid')
          } else {
            alert('Password changed')
          }
        })
        xhr.open("POST", "http://localhost:8080/api/v1/updateUserData", true);
        xhr.send(JSON.stringify({ username: sessionStorage.getItem('username'), password: newPassword, oldPassword: currentPassword}));
      } else {
        alert('Check that:\n1. Your current password does not match your new password\n2. Both fields for your new password match')
      }
    } else {
      alert('Please fill out all the fields.')
    }
  }

  // const instance = axios.create({ baseURL: "http://localhost:8080/api/v1" });
  const updateBio = () => {
    // instance.post("/updateUserProfile", { biography: bio });
    // setBio("");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/api/v1/updateUserData", true);
    xhr.send(JSON.stringify({ username: "aumpatel", biography: bio }));
    setBio("");
  };

  return (
    <div className="centContainer">
      <h5>MY SPORTCRED ACCOUNT</h5>
      <h3>Update Biography</h3>
      <textarea
        placeholder=" Enter something about you..."
        name="bio"
        id="bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <button className="button1" onClick={updateBio}>
        Update
      </button>
      <br />
      <h3>update profile picture</h3>
      <p>coming soon...</p>
      <br />
      <h3>update questionnaire answers</h3>
      <form>
        <label htmlFor="favSport">favourite sport</label>
        <input type="text" name="favSport" placeholder="Enter sport" />
        <label htmlFor="sportLevel">highest level of sport played</label>
        <input
          type="text"
          name="sportLevel"
          placeholder="Enter highest level of sport played"
        />
        <label htmlFor="age">age</label>
        <input type="text" name="age" placeholder="Enter age" />
        <label htmlFor="favSportTeam">team you are rooting for</label>
        <input
          type="text"
          name="favSportTeam"
          placeholder="Enter favourite sport"
        />
        <label htmlFor="learnSport">sport you want to learn</label>
        <input
          type="text"
          name="learnSport"
          placeholder="Enter sport you want to learn about"
        />
        <button type="submit" className="button1">
          Update
        </button>
      </form>
      <br />
      <h3>Update password</h3>
      <form>
        <label htmlFor="oldPassword"></label>
          <input type="text" name="oldPassword" placeholder="Enter current password" onChange={event => setCurrentPassword(event.target.value)}/>
        <label htmlFor="newPassword"></label>
          <input type="text" name="newPassword" placeholder="Enter new password" onChange={event => setNewPassword(event.target.value)}/>
        <label htmlFor="confirmedPassword"></label>
          <input type="text" name="confirmedPassword" placeholder="Confirm new password" onChange={event => setConfirmPassword(event.target.value)}/> 
        <button type="submit" className="button1" onClick={event => handlePassword(event)}>Update</button>
      </form>
      <br />
      <hr />
      <button id="logOutBtn" className="button1">
        LOG OUT
      </button>
      <br />
    </div>
  );
};

export default EditProfile;
