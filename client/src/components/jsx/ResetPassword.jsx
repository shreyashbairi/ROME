import React from "react"
import { useState } from "react";
import '../css/Login.css';
import axios from 'axios';
import { Navigate } from "react-router-dom";

export default function (props) {
  const [userPassword,setPassword] = useState("");
  const [userPasswordConfirm,setPasswordConfirm] = useState("");
  const [redirect, setRedirect] = useState(false);
  function HandleSubmit (e) { 
    e.preventDefault();
    e.preventDefault();
    const username = localStorage.getItem("userid");
    // console.log("phonnumber:")
    // console.log(cphone);
    // axios.put('/editprofile', {username, cbirthday, cphone, caddress, cnotification});
    if (userPassword === userPasswordConfirm) {
    try {
      axios.post('/resetpassword', {
        username,
        userPassword
      });
      setRedirect(true);
    } catch (e) {
      alert("Password Update Failed");
    }
    } else {
      alert("Passwords Dont Match");
    }
    /* send user input to backend */
  }
  if (redirect) {
    return <Navigate to={'/profile'} />
  }
  return (
    <div className="Auth-form-container" onSubmit={HandleSubmit}>
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Reset Password</h3>
          <div className="form-group mt-3">
            <label>New Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={userPassword}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Confirm New Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={userPasswordConfirm}
              onChange={e => setPasswordConfirm(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Reset Password
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}