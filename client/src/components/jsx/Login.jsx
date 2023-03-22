import React from "react"
import { UserContext } from "./UserContext";
//import { Redirect } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import '../css/Login.css';
import { Navigate } from "react-router-dom";
function Login() {
  const [userUserName, setUserUserName] = useState("");
  const [userPassword, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function HandleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post('/login', { userUserName, userPassword });
      setUser(data);
      if (data != null) {
        alert(`login successful. Hi ${userUserName}!`);
        localStorage.setItem('userid', userUserName);
        setRedirect(true); // Set the redirect state to true
        localStorage.setItem('isLoggedIn', 'true'); 
      } else {
        alert('User not found');
      }
    } catch (e) {
      alert('Login Failed. Invalid Username or Password');
    }
  }

  // If redirect is true, render the Navigate component to redirect to the main page
  if (redirect) {
    return <Navigate to="/main" />;
  }


  
     /* send user input to backend */
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={HandleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Login</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="username"
              className="form-control mt-1"
              placeholder="username"
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
            Forgot <a href="/forgotpassword">password?</a>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login