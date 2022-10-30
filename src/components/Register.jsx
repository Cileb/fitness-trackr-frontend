import { registerUser } from "../api";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const { setToken } = props;
  const [error, setError] = useState("");

  const navigate = useNavigate();

  return (
    <>
      <div className="login-page">
        <div className="login-container">
          <div className="login-header">
            <h2>Register</h2>
          </div>
          <form
            className="login-form"
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                if (password !== passwordCheck) {
                  setError("Passwords don't match!");
                } else {
                  const result = await registerUser(username, password);
                  if (result.error) {
                    setError(result.message);
                  } else {
                    setError("");
                    localStorage.setItem("token", result.token);
                    setToken(result.token);
                    setPassword("");
                    setUsername("");
                    setPasswordCheck("");
                    navigate("/account/routines");
                  }
                }
              } catch (error) {
                throw error;
              }
            }}
          >
            <div className="form-input">
              <label>Username</label>
              <input
                required
                type="text"
                placeholder="Username *"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
              <i className="fas fa-check-circle"></i>
              <i className="fas fa-exclamation-circle"></i>
              <small>Error Message</small>
            </div>
            <div className="form-input">
              <label>Password</label>
              <input
                required
                type="password"
                placeholder="Password *"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <i className="fas fa-check-circle"></i>
              <i className="fas fa-exclamation-circle"></i>
              <small>Error Message</small>
            </div>
            <div className="form-input">
              <label>Re-Enter Password</label>
              <input
                required
                type="password"
                placeholder="Confirm Password *"
                value={passwordCheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
              ></input>
              <i className="fas fa-check-circle"></i>
              <i className="fas fa-exclamation-circle"></i>
              <small>Error Message</small>
            </div>
            {error}
            <button>REGISTER</button>
            <Link to="/account/login">Already have an account? Log In</Link>
          </form>
        </div>
      </div>
    </>
  );
}
