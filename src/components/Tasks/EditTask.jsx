import { useState } from "react";
import { useTasks } from "../../contexts/TasksContext";

const EditTask = ({ task, setIsEditMode }) => {
  const [titleInput, setTitleInput] = useState(task.title);
  const [descriptionInput, setDescriptionInput] = useState(
    task.description || ""
  );
  const [dueDateInput, setDueDateInput] = useState(
    task.due_date ? new Date(task.due_date).toISOString().slice(0, 16) : ""
  );
  const [isCompleted, setIsCompleted] = useState(task.is_completed);
  const [loading, setLoading] = useState(false);

  const { editTask } = useTasks();

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    if (!titleInput.trim()) return;

    setLoading(true);
    try {
      await editTask(task.id, {
        title: titleInput,
        description: descriptionInput,
        due_date: dueDateInput ? new Date(dueDateInput).toISOString() : null,
        is_completed: isCompleted,
      });
      setIsEditMode(false);
    } catch (err) {
      console.error("Update task failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">Edit Task</h3>
      </div>
      <form onSubmit={handleUpdateTask} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            type="text"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            placeholder="Enter title"
            autoFocus
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
            required
            placeholder="Write your task..."
            rows="5"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Due Date (optional)
          </label>
          <input
            type="datetime-local"
            value={dueDateInput}
            onChange={(e) => setDueDateInput(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <span className="text-sm font-medium text-gray-700">Completed</span>
          <div className="relative inline-flex items-center">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={() => setIsCompleted(!isCompleted)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer-checked:bg-blue-600 transition-all"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
          </div>
        </label>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition cursor-pointer"
            onClick={() => {
              setTitleInput(task.title);
              setDescriptionInput(task.description || "");
              setDueDateInput(
                task.due_date
                  ? new Date(task.due_date).toISOString().slice(0, 16)
                  : ""
              );
              setIsCompleted(task.is_completed);
              setIsEditMode(false);
            }}
          >
            Discard Changes
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
