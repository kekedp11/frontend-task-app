import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import {
  getTasks as getTasksService,
  createTask,
  deleteTask,
  toggleTask,
  updateTask,
} from "./services/taskService";
import {
  login as loginService,
  register as registerService,
} from "./services/authService";

function App() {
  // Task State
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [dueDate, setDueDate] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // UI State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Auth State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    if (!isLoggedIn) return;

    const timeout = setTimeout(() => {
      getTasks(page, search);
    }, 300);

    return () => clearTimeout(timeout);
  }, [isLoggedIn, page, search]);

  async function getTasks(pageNumber = 1, searchText = "") {
    try {
      const data = await getTasksService(pageNumber, searchText);
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmit(e) {
  e.preventDefault();

  setError("");
  setLoading(true);

  const data = await createTask({
    title,
    dueDate,
  });

  console.log(data);

  if (!data.data) {
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
    await deleteTask(id);
    getTasks();
  }

  async function handleUpdate(id) {
  setError("");

  const data = await updateTask(id, {
    title,
    dueDate,
  });

  if (!data.data) {
    setError(data.message);
    return;
  }

  setTitle("");
  setDueDate("");
  setEditId(null);

  getTasks();
}

  async function handleToggle(id) {
    await toggleTask(id);
    getTasks();
  }

  async function handleLogin() {
  const data = await loginService(
    username,
    password
  );

  if (!data.token) {
    setError(data.message);
    return;
  }

  localStorage.setItem("token", data.token);

  setIsLoggedIn(true);

  await getTasks();

  alert("Login berhasil 🔥");
}

  async function handleRegister() {
  setError("");

  const data = await registerService(
    username,
    password
  );

  if (!data.data) {
    setError(data.message);
    return;
  }

  alert("Register berhasil 🎉");

  setIsRegister(false);

  setUsername("");
  setPassword("");
}

  function handleLogout() {
  localStorage.removeItem("token");

  setTasks([]);

  setIsLoggedIn(false);

  alert("Logout berhasil 👋");
  }

if (!isLoggedIn) {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {isRegister ? "Register" : "Login"}
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
          handleRegister={handleRegister}
          isRegister={isRegister}
          setIsRegister={setIsRegister}
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
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full p-3 mb-4 rounded-lg bg-gray-700 outline-none"
        />

        <TaskList
          tasks={tasks}
          handleToggle={handleToggle}
          handleDelete={handleDelete}
          setTitle={setTitle}
          setEditId={setEditId}
          setError={setError}
        />

        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm font-medium">
            Page {page}
          </span>

          <button
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;