import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addRoutine, fetchAllRoutines } from "../api";

export default function MyRoutines(props) {
  const { currentUser, routines, token, setRoutines } = props;
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const [error, setError] = useState("");

  let navigate = useNavigate();

  const fetchRoutines = async () => {
    const result = await fetchAllRoutines();
    setRoutines(result);
  };

  const myRoutines = routines.filter(
    (routine) => Number(routine.creatorId) === Number(currentUser.id)
  );

  useEffect(() => {
    fetchRoutines();
  }, [myRoutines]);

  return (
    <>
      <div>
        <h3>Routines for {currentUser.username}</h3>

        <div>
          <div className="login-container">
            <div className="login-header">
              <h2>Add New Routine</h2>
            </div>
            <form
              className="login-form"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  if (!name || !goal) {
                    setError("Please provide both a name and description");
                  } else {
                    const result = await addRoutine(
                      name,
                      goal,
                      isPublic,
                      token
                    );
                    if (result.error) {
                      console.log(result);
                      setError(result.message);
                    } else {
                      setError("");
                    }
                  }
                } catch (error) {
                  throw error;
                }
              }}
            >
              <div className="form-input">
                <label>Name: </label>
                <input
                  type="text"
                  placeholder="Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
                <i className="fas fa-check-circle"></i>
                <i className="fas fa-exclamation-circle"></i>
              </div>
              <div className="form-input">
                <label>Description: </label>
                <input
                  type="text"
                  placeholder="Description *"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                ></input>
                <i className="fas fa-check-circle"></i>
                <i className="fas fa-exclamation-circle"></i>
              </div>
              <div className="form-input">
                <label>Public?</label>
                <input
                  type="checkbox"
                  placeholder="Description *"
                  value={isPublic}
                  onChange={(e) => setIsPublic(!isPublic)}
                ></input>
                <i className="fas fa-check-circle"></i>
                <i className="fas fa-exclamation-circle"></i>
              </div>
              {error}
              <button>CREATE</button>
            </form>
          </div>
        </div>
      </div>
      {myRoutines ? (
        <>
          <div className="posts-container">
            {myRoutines.map((routine, idx) => {
              return (
                <div
                  className="posts"
                  onClick={() => {
                    navigate(`/routines/${routine.id}`);
                  }}
                >
                  <div>
                    <h3>{routine.name}</h3>
                    <div>
                      <span>{routine.goal}</span>
                    </div>
                    <div>Creator: {routine.creatorName}</div>
                  </div>
                  <div className="description">
                    Activities:
                    {routine.activities.map((activity, idx) => {
                      return (
                        <>
                          <div key={idx}>{activity.name}</div>
                          <div>Description: {activity.description}</div>
                          <div>Count: {activity.count}</div>
                          <div>Duration: {activity.duration}</div>
                        </>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
