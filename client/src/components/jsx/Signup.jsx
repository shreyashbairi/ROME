import React from "react";
import { useState } from "react";
import '../css/Login.css';

export default function (props) {
  const [userFullname,setUserFullname] = useState('');
  const [userEmail,setUserEmail] = useState('');
  const [userUserName,setUserUserName] = useState('');
  const [userPassword,setPassword] = useState('');
  function HandleSignUpSubmit (e) { 
    e.preventDefualt();
    alert("Submitted")
  }
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={HandleSignUpSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="name"
              className="form-control mt-1"
              placeholder="eg. Jane doe"
              value={userFullname}
              onChange={e => setUserFullname(e.target.value)}  
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              value={userEmail}
              onChange={e => setUserEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="username"
              className="form-control mt-1"
              placeholder="Enter username"
              value={userUserName}
              onChange={e => setUserUserName(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={userPassword}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="/forgetpassword">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
}
