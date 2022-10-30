import React from "react";
import { useEffect, useState } from "react";

import { addActivity, fetchAllActivities } from "../api";

export default function Activities(props) {
  const { routines, token, currentUser, activities, setActivities } = props;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const fetchActivities = async () => {
    const result = await fetchAllActivities();
    setActivities(result);
  };

  useEffect(() => {
    fetchActivities();
  }, [activities]);

  return (
    <>
      {currentUser.username ? (
        <>
          <div>
            <div className="login-container">
              <div className="login-header">
                <h2>Add New Activity</h2>
              </div>
              <form
                className="login-form"
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    if (!name || !description) {
                      setError("Please provide both a name and description");
                    } else {
                      const result = await addActivity(
                        name,
                        description,
                        token
                      );
                      if (result.error) {
                        console.log(result.error);
                        setError(result.message);
                      } else {
                        setError("Activity Created!");
                        setName("");
                        setDescription("");
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
                </div>
                <div className="form-input">
                  <label>Description: </label>
                  <input
                    type="text"
                    placeholder="Description *"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></input>
                </div>
                {error}
                <button>CREATE</button>
              </form>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <div>
        <h2>Activites</h2>
      </div>
      <div>
        {activities.map((activity, idx) => {
          return (
            <>
              <div className="posts" key={idx}>
                <div>
                  <h2>{activity.name}</h2>
                </div>
                <div>{activity.description}</div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
