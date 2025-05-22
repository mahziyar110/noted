import { useState } from "react";
import Modal from "../Modal";
import { useTasks } from "../../contexts/TasksContext";

const AddTask = ({ showAddTask, setShowAddTask }) => {
  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { createTask } = useTasks();

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!titleInput.trim()) return;

    setLoading(true);

    try {
      let dueDate = null;
      if (dateInput) {
        const time = timeInput || "23:59";
        const localDateTime = new Date(`${dateInput}T${time}`);
        dueDate = localDateTime.toISOString();
      }

      await createTask(titleInput, descriptionInput, dueDate, isCompleted);

      setTitleInput("");
      setDescriptionInput("");
      setDateInput("");
      setTimeInput("");
      setIsCompleted(false);
      setShowAddTask(false);
    } catch (err) {
      console.error("Add task failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={showAddTask} onClose={() => setShowAddTask(false)}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">New Task</h3>
          <button
            onClick={() => setShowAddTask(false)}
            className="text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            ✖
          </button>
        </div>

        <form onSubmit={handleAddTask} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              placeholder="Enter task title"
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
              placeholder="Describe your task..."
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Due Date (optional)
              </label>
              <input
                type="date"
                value={dateInput}
                onChange={(e) => {
                  setDateInput(e.target.value);
                  if (!e.target.value) setTimeInput("");
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Time (optional)
              </label>
              <input
                type="time"
                value={timeInput}
                onChange={(e) => setTimeInput(e.target.value)}
                disabled={!dateInput}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm ${
                  !dateInput ? "bg-gray-100 cursor-not-allowed" : ""
                } focus:outline-none focus:ring-2 focus:ring-blue-400`}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={(e) => setIsCompleted(e.target.checked)}
              id="isCompleted"
              className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
            />
            <label
              htmlFor="isCompleted"
              className="text-gray-700 cursor-pointer"
            >
              Mark as completed
            </label>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save Task"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddTask;
