import React, { useState, useEffect } from "react";
import {
  Login,
  MyRoutines,
  NavBar,
  Register,
  Routines,
  Routine,
} from "./components";
import { Routes, Route } from "react-router-dom";
import { fetchAllActivities, fetchAllRoutines, fetchMe } from "./api";
import Activities from "./components/Activities";

export default function App() {
  const [routines, setRoutines] = useState([]);
  const [activities, setActivities] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState("");

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    async function getMe() {
      const result = await fetchMe(localStorageToken);
      console.log(result);
      setCurrentUser(result);
      setToken(localStorageToken);
      console.log(token);
    }
    if (localStorageToken) {
      getMe();
    }
  }, [token]);

  const fetchRoutines = async () => {
    const result = await fetchAllRoutines();
    setRoutines(result);
  };
  const fetchActivities = async () => {
    const result = await fetchAllActivities();
    setActivities(result);
  };

  useEffect(() => {
    fetchRoutines();
    fetchActivities();
  }, []);

  return (
    <>
      <NavBar
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setToken={setToken}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Routines
              routines={routines}
              setRoutines={setRoutines}
              currentUser={currentUser}
              token={token}
            ></Routines>
          }
        />
        <Route
          path="/account/login"
          element={<Login setToken={setToken}></Login>}
        />
        <Route
          path="/account/register"
          element={<Register setToken={setToken} />}
        />
        {currentUser.username ? (
          <Route
            path="/account/routines"
            element={
              <MyRoutines
                currentUser={currentUser}
                token={token}
                routines={routines}
                setRoutines={setRoutines}
              />
            }
          />
        ) : (
          <></>
        )}
        <Route
          path="/activities"
          element={
            <Activities
              routines={routines}
              activities={activities}
              setActivities={setActivities}
              token={token}
              currentUser={currentUser}
            />
          }
        />
        <Route
          path="/routines/:routineId"
          element={
            <Routine
              routines={routines}
              activities={activities}
              setActivities={setActivities}
              currentUser={currentUser}
              token={token}
              setRoutines={setRoutines}
            />
          }
        />
      </Routes>
    </>
  );
}
