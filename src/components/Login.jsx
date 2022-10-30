import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setToken } = props;

  let navigate = useNavigate();

  return (
    <>
      <div className="login-page">
        <div className="login-container">
          <div className="login-header">
            <h2>Log In</h2>
          </div>
          <form
            className="login-form"
            onSubmit={async (e) => {
              try {
                e.preventDefault();

                const result = await loginUser(username, password);
                if (result.error) {
                  setError(result.message);
                } else {
                  setError("");
                  navigate("/account/routines");
                  localStorage.setItem("token", result.token);
                  setToken(result.token);
                  setPassword("");
                  setUsername("");
                }
              } catch (error) {
                throw error;
              }
            }}
          >
            <div className="form-input">
              <label>Username</label>
              <input
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
                type="password"
                placeholder="Password *"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <i className="fas fa-check-circle"></i>
              <i className="fas fa-exclamation-circle"></i>
              <small>Error Message</small>
            </div>
            {error}
            <button>LOG IN</button>

            <Link to="/account/register">Don't have an account? Sign up</Link>
          </form>
        </div>
      </div>
    </>
  );
}
