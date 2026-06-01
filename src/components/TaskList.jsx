function TaskList({
  tasks,
  handleToggle,
  handleDelete,
  setTitle,
  setEditId,
  setError,
}) {
  if (tasks.length === 0) {
    return (
      <p className="text-gray-400 text-center">
        Belum ada task 😴
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
        >
          <div className="flex flex-col">
            <p
              className={
                task.completed
                  ? "line-through text-gray-400 text-lg font-medium"
                  : "text-lg font-medium"
              }
            >
              {task.title}
            </p>

            {task.dueDate && (
              <p
                className={`text-sm mt-1 ${
                  new Date(task.dueDate) < new Date() &&
                  !task.completed
                    ? "text-red-400"
                    : "text-gray-400"
                }`}
              >
                📅 Deadline:{" "}
                {new Date(task.dueDate).toLocaleDateString()}
                {new Date(task.dueDate) < new Date() &&
                  !task.completed &&
                  " (Overdue)"}
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleToggle(task._id)}
              className="bg-green-500 px-3 py-1 rounded hover:bg-green-600"
            >
              {task.completed ? "Belum" : "Selesai"}
            </button>

            <button
              onClick={() => {
                setTitle(task.title);
                setEditId(task._id);
                setError("");
              }}
              className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(task._id)}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Hapus
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;