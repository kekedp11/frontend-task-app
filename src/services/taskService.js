const API_URL = "https://backend-task-app-b6va.onrender.com/tasks";

function getHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

const API_URL = "https://backend-task-app-b6va.onrender.com/tasks";

export async function getTasks(page = 1, search = "") {
  const response = await fetch(
    `${API_URL}?page=${page}&limit=5&search=${search}`,
    {
      headers: getHeaders(),
    }
  );

  return response.json();
}

export async function createTask(task) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(task),
  });

  const data = await response.json();

  console.log("CREATE RESPONSE:", data);

  return data;
}

export async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
}

export async function updateTask(id, task) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(task),
  });

  return response.json();
}

export async function toggleTask(id) {
  await fetch(`${API_URL}/${id}/toggle`, {
    method: "PATCH",
    headers: getHeaders(),
  });
}