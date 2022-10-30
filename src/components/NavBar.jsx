import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar(props) {
  const { currentUser, setCurrentUser, setToken } = props;
  const navigate = useNavigate();
  return (
    <header>
      <div className="nav">
        <h1
          onClick={() => {
            navigate("/");
          }}
        >
          FitnessTrackr
        </h1>
        <div className="nav-bar">
          <Link className="header-link" to="/">
            ROUTINES
          </Link>
          {currentUser.username ? (
            <Link className="header-link" to="/account/routines">
              MY ROUTINES
            </Link>
          ) : (
            <></>
          )}
          <Link className="header-link" to="/activities">
            ACTIVITIES
          </Link>
          <>
            {currentUser.username ? (
              <Link
                className="header-link"
                to="/account/login"
                onClick={() => {
                  setCurrentUser({});
                  localStorage.clear();
                  setToken("");
                }}
              >
                LOGOUT ({currentUser.username})
              </Link>
            ) : (
              <>
                <Link className="header-link" to="/account/login">
                  LOGIN
                </Link>
                <Link className="header-link" to="/account/register">
                  REGISTER
                </Link>
              </>
            )}
          </>
        </div>
      </div>
    </header>
  );
}
