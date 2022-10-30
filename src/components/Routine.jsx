import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  addToRoutine,
  destroyRoutine,
  deleteRoutineActivity,
  fetchAllRoutines,
  updateRoutine,
  updateRoutineActivity,
} from "../api";

export default function Routine(props) {
  const { routineId } = useParams();
  const { routines, activities, currentUser, setRoutines, token } = props;
  const [count, setCount] = useState(Number);
  const [duration, setDuration] = useState(Number);
  const [error, setError] = useState();
  const [activity, setActivity] = useState("");
  const [submit, setSubmit] = useState(false);
  const [editRoutine, setEditRoutine] = useState(false);
  const [deleteRoutine, setDeleteRoutine] = useState(false);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [editActivity, setEditActivity] = useState(false);
  const [deleteActivity, setDeleteActivity] = useState(false);
  const [activityName, setActivityName] = useState("");

  const navigate = useNavigate();

  const routine = routines.filter(
    (routine) => routine.id === Number(routineId)
  )[0];

  const fetchRoutines = async () => {
    const result = await fetchAllRoutines();
    setRoutines(result);
  };

  useEffect(() => {
    fetchRoutines();
    console.log("fetching activities");
  }, [submit]);

  return (
    <>
      {currentUser.id === Number(routine.creatorId) ? (
        <>
          {editRoutine ? (
            <>
              <div>
                <div className="login-container">
                  <div className="login-header">
                    <h2>Edit Routine</h2>
                  </div>
                  <form
                    className="login-form"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      try {
                        const result = await updateRoutine(
                          name,
                          goal,
                          isPublic,
                          token,
                          routineId
                        );
                        setSubmit(!submit);
                        setEditRoutine(false);
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
                      <label>Goal:</label>
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
                        checked={isPublic}
                        onChange={(e) => setIsPublic(!isPublic)}
                      ></input>
                      <i className="fas fa-check-circle"></i>
                      <i className="fas fa-exclamation-circle"></i>
                    </div>
                    {error}
                    <button>EDIT</button>
                  </form>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          <div className="posts">
            <div>
              <div>
                <h3>{routine.name}</h3>
                <div>
                  <span>{routine.goal}</span>
                </div>
                <div>Creator: {routine.creatorName}</div>
                <button onClick={() => setDeleteRoutine(true)}>DELETE</button>
                {deleteRoutine ? (
                  <>
                    <div>Are you sure you want to delete?</div>
                    <button onClick={() => setDeleteRoutine(false)}>
                      CANCEL
                    </button>
                    <button
                      onClick={() =>
                        destroyRoutine(token, Number(routineId)) &&
                        navigate("/account/routines")
                      }
                    >
                      YES
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <button onClick={() => setEditRoutine(true)}>EDIT</button>
            </div>
            <h4>Activities:</h4>
            <div className="description">
              {routine.activities.map((activity, idx) => {
                return (
                  <>
                    <div key={idx}>
                      <div>{activity.name}</div>
                      <div>Description: {activity.description}</div>
                      <div>Count: {activity.count}</div>
                      <div>Duration: {activity.duration}</div>

                      <button
                        onClick={() => {
                          setActivityName(activity);
                          setCount(activity.count);
                          setDuration(activity.duration);
                        }}
                      >
                        EDIT
                      </button>
                      <button
                        onClick={async () => {
                          await deleteRoutineActivity({
                            routineActivityId: activity.routineActivityId,
                            token,
                          });
                          setSubmit(!submit);
                        }}
                      >
                        DELETE
                      </button>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="login-container">
            <div className="login-header">
              {activityName ? (
                <>
                  <h2>Editting {activityName.name} </h2>
                </>
              ) : (
                <>
                  <h2>Add Activity</h2>
                </>
              )}
            </div>
            <form
              className="login-form"
              onSubmit={async (e) => {
                e.preventDefault();

                try {
                  if (!activityName) {
                    if (!activity) {
                      setError("Please select an activity!");
                    } else {
                      const result = await addToRoutine(
                        activity,
                        count,
                        duration,
                        routineId
                      );
                      if (result.error) {
                        console.log(result);
                        setError(
                          "This activity already exists on this routine. Please edit the activity instead."
                        );
                      } else {
                        setError("");
                      }
                    }
                  } else {
                    const result = await updateRoutineActivity({
                      count,
                      duration,
                      routineActivityId: activityName.routineActivityId,
                      token,
                    });
                    if (result.error) {
                      setError(result.message);
                    } else {
                      setError("");
                    }
                  }
                  setSubmit(!submit);
                } catch (error) {
                  throw error;
                }
              }}
            >
              {activityName ? (
                <>
                  <div
                    onClick={() => {
                      setActivityName("");
                      setCount(0);
                      setDuration(0);
                    }}
                  >
                    (Add New Instead)
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <div className="form-input">
                    <label></label>
                    <select
                      value={activity}
                      onChange={(e) => setActivity(e.target.value)}
                    >
                      <option value={""}></option>
                      {activities.map((activity, idx) => {
                        return (
                          <option value={activity.id}>{activity.name}</option>
                        );
                      })}
                    </select>
                    <i className="fas fa-check-circle"></i>
                    <i className="fas fa-exclamation-circle"></i>
                  </div>
                </>
              )}

              <div className="form-input">
                <label>Count</label>
                <input
                  type="number"
                  placeholder="Count *"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                ></input>
                <i className="fas fa-check-circle"></i>
                <i className="fas fa-exclamation-circle"></i>
              </div>
              <div className="form-input">
                <label>Duration</label>
                <input
                  type="number"
                  placeholder="Description *"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                ></input>
                <i className="fas fa-check-circle"></i>
                <i className="fas fa-exclamation-circle"></i>
              </div>
              {error}
              {activityName ? <button>EDIT</button> : <button>CREATE</button>}
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="posts-container">
            <div className="posts">
              <h3>{routine.name}</h3>
              <div>
                <span>{routine.goal}</span>
              </div>
              <div>Creator: {routine.creatorName}</div>
              Activities:
              <div className="description">
                {routine.activities.map((activity, idx) => {
                  return (
                    <>
                      <div key={idx}>
                        <div>
                          <h4>{activity.name}</h4>
                        </div>
                        <div className="posts-seller">
                          <div className="post-info">
                            <span>{activity.description}</span>
                            <span> Count: {activity.count}</span>
                            <span>Duration: {activity.duration}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
