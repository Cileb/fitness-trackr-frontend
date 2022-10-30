import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchAllRoutines } from "../api";

export default function Routines(props) {
  const { routines, setRoutines } = props;

  const navigate = useNavigate();

  const fetchRoutines = async () => {
    const result = await fetchAllRoutines();
    setRoutines(result);
  };

  useEffect(() => {
    fetchRoutines();
  }, []);

  return (
    <>
      <div className="posts-header">
        <h3>Public Routines</h3>
      </div>
      <div className="posts-container">
        {routines.map((routine, idx) => {
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
              <h2>Activities</h2>
              <div className="description">
                {routine.activities.map((activity, idx) => {
                  return (
                    <>
                      <div key={idx}>
                        <div>
                          <h4>{activity.name}</h4>
                        </div>
                        <div>Description: {activity.description}</div>
                        <div>Count: {activity.count}</div>
                        <div>Duration: {activity.duration}</div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
