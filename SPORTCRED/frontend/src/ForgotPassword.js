import './ForgotPassword.css';
import React, { useState } from 'react';
import emailjs from 'emailjs-com';

export default function ForgotPassword() {

  const [userEmail, setUserEmail] = useState('')

  function sendEmail(e) {
    e.preventDefault();
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      if (xhr.responseText.length > 0) {
        var password = xhr.responseText;
        emailjs.send('service_jn32ohg', 'template_qovxh4g', { to_email: userEmail, password: atob(password) }, 'user_IuWaar2NsHsa7Rkc1hSSh');       
      }
    })
    xhr.open("POST", "http://localhost:8080/api/v1/recoverPassword", true);
    xhr.send(JSON.stringify({ email: btoa(userEmail)}));
    alert("If there is an account associated with the provided email address, then you will receive an email with a link to reset your password.");
  }

  return (
    <div className="container">
      <form className="passwordForm" onSubmit={sendEmail}>
        <h3 className="passwordLabel">Reset Password</h3>
        <p className="passwordLabel">Please enter the email address that is associated with your SportCred account.</p>
        <input className = "inputEmail" type="email" placeholder="example@email.com" required onChange={event => setUserEmail(event.target.value)}></input>
        <button className="submitEmail" type="submit">Submit</button>
      </form>
    </div>
  );
}