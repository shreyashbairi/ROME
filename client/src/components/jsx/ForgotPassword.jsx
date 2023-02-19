import React from "react"
import { useState } from "react";
import '../css/Login.css';
import { Link } from 'react-router-dom';

export default function (props) {
  const [userEmail,setUserEmail] = useState("");
  function HandleSubmit (e) { 
    e.preventDefualt();
    alert("Hello?") 
    /* send user input to backend */
  }
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={HandleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Reset Password</h3>
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
          <div className="d-grid gap-2 mt-3">
            <a href="/resetpassword">
            <button type="button" className="btn btn-primary">
              Send
            </button>
            </a>
          </div>
        </div>
      </form>
    </div>
  )
}