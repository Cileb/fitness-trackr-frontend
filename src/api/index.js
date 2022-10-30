export const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api";

export async function fetchAllRoutines() {
  const url = `${BASE_URL}/routines`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching all routines!");
    throw error;
  }
}

export async function fetchAllActivities() {
  const url = `${BASE_URL}/activities`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching all activities!");
    throw error;
  }
}

export async function fetchMe(token) {
  const response = await fetch(`${BASE_URL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  console.log("fetchMe result", result);
  return result;
}

export async function loginUser(username, password) {
  const url = `${BASE_URL}/users/login`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const result = await response.json();
    console.log("RESULT, ", result);
    return result;
  } catch (error) {
    console.error("Error logging in user.");
    throw error;
  }
}

export async function registerUser(username, password) {
  const url = `${BASE_URL}/users/register`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const result = await response.json();
    console.log("User: ", result);
    return result;
  } catch (error) {
    console.error("Error registering user.");
    throw error;
  }
}

export async function addRoutine(name, goal, isPublic, token) {
  const response = await fetch(`${BASE_URL}/routines`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      goal,
      isPublic,
    }),
  });
  const result = await response.json();
  return result;
}

export async function addActivity(name, description, token) {
  console.log("ADD Activity");
  console.log("Token from ADD ACTIVITY", token);
  const response = await fetch(`${BASE_URL}/activities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      description,
    }),
  });
  const result = await response.json();
  return result;
}

export async function updateRoutineActivity({
  count,
  duration,
  token,
  routineActivityId,
}) {
  const response = await fetch(
    `${BASE_URL}/routine_activities/${routineActivityId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        count,
        duration,
      }),
    }
  );
  const result = await response.json();
  return result;
}

export async function addToRoutine(activityId, count, duration, routineId) {
  console.log("addToRoutine:", activityId, count, duration, routineId);
  const response = await fetch(`${BASE_URL}/routines/${routineId}/activities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      activityId,
      count,
      duration,
    }),
  });
  const result = await response.json();
  return result;
}

export async function updateRoutine(name, goal, isPublic, token, routineId) {
  const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      goal,
      isPublic,
    }),
  });
  const result = await response.json();
  return result;
}

export async function destroyRoutine(token, routineId) {
  const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
}

export async function deleteRoutineActivity({ token, routineActivityId }) {
  const response = await fetch(
    `${BASE_URL}/routine_activities/${routineActivityId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const result = await response.json();
}
