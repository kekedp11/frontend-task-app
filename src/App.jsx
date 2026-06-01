import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  // Task State
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [dueDate, setDueDate] = useState("");
  const [search, setSearch] = useState("");

  // UI State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Auth State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    if (isLoggedIn) {
      getTasks();
    }
  }, [isLoggedIn]);

  async function getTasks() {
  const token = localStorage.getItem("token");

  if (!token) {
    return;
  }

  const response = await fetch(
    "http://localhost:3000/tasks",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    return;
  }

  const data = await response.json();

  setTasks(data);
}

  async function handleSubmit(e) {
  e.preventDefault();

  setError("");
  setLoading(true);

  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:3000/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: title,
      dueDate: dueDate,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    setError(data.message);
    setLoading(false);
    return;
  }

  setTitle("");
  setDueDate("");
  setLoading(false);

  getTasks();
}

  async function handleDelete(id) {

  const token = localStorage.getItem("token");

    await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    getTasks();
  }

  async function handleUpdate(id) {
  setError("");

  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:3000/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: title,
      dueDate: dueDate,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    setError(data.message);
    return;
  }

  setTitle("");
  setDueDate("");
  setEditId(null);

  getTasks();
}

  async function handleToggle(id) {

  const token = localStorage.getItem("token");

  await fetch(`http://localhost:3000/tasks/${id}/toggle`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  getTasks();
}

  async function handleLogin() {
  const response = await fetch(
    "http://localhost:3000/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    setError(data.message);
    return;
  }

  localStorage.setItem("token", data.token);

  setIsLoggedIn(true);

  await getTasks();

  alert("Login berhasil 🔥");
}

  function handleLogout() {
  localStorage.removeItem("token");

  setTasks([]);

  setIsLoggedIn(false);

  alert("Logout berhasil 👋");
  }

  const filteredTasks = tasks.filter((task) =>
  task.title.toLowerCase().includes(search.toLowerCase())
);

if (!isLoggedIn) {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        {error && (
          <p className="text-red-400 mb-4">
            {error}
          </p>
        )}

        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          handleLogin={handleLogin}
        />
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Task App
        </h1>

        <div className="flex justify-end mb-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <TaskForm
          title={title}
          setTitle={setTitle}
          dueDate={dueDate}
          setDueDate={setDueDate}
          editId={editId}
          loading={loading}
          handleSubmit={handleSubmit}
          handleUpdate={handleUpdate}
        />

        {error && (
          <p className="text-red-400 mb-4">
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Cari task..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-gray-700 outline-none"
        />

        <TaskList
          tasks={filteredTasks}
          handleToggle={handleToggle}
          handleDelete={handleDelete}
          setTitle={setTitle}
          setEditId={setEditId}
          setError={setError}
        />

      </div>
    </div>
  );
}

export default App;