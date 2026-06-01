function TaskForm({
  title,
  setTitle,
  dueDate,
  setDueDate,
  editId,
  loading,
  handleSubmit,
  handleUpdate,
}) {
  return (
    <form
      onSubmit={(e) => {
        if (editId) {
          e.preventDefault();
          handleUpdate(editId);
        } else {
          handleSubmit(e);
        }
      }}
      className="flex flex-col gap-2 mb-6"
    >
      <input
        type="text"
        placeholder="Masukkan task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 p-3 rounded-lg bg-gray-700 outline-none"
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="p-3 rounded-lg bg-gray-700 outline-none"
      />

      {editId ? (
        <button
          type="button"
          disabled={loading}
          onClick={() => handleUpdate(editId)}
          className="bg-yellow-500 px-4 rounded-lg hover:bg-yellow-600"
        >
          {loading ? "Loading..." : "Update"}
        </button>
      ) : (
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 px-4 rounded-lg hover:bg-blue-600"
        >
          {loading ? "Loading..." : "Tambah"}
        </button>
      )}
    </form>
  );
}

export default TaskForm;