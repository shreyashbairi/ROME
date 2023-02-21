import React from "react"
import { useState } from "react";
import '../css/Login.css';

export default function (props) {
  const [userPassword,setPassword] = useState("");
  const [userPasswordConfirm,setPasswordConfirm] = useState("");
  function HandleSubmit (e) { 
    e.preventDefault();
    /* send user input to backend */
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
              Send Email
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}