import { useState } from "react";
import ExpandedTask from "./ExpandedTask";
import { useTasks } from "../../contexts/TasksContext";

const TaskCard = ({
  task,
  handleDeleteTask,
  confirmingDeleteIds,
  setConfirmingDeleteIds,
}) => {
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  const dueDate = task.due_date
    ? new Date(task.due_date).toLocaleString()
    : "No due date";

  const isOverdue =
    !task.is_completed && task.due_date && new Date(task.due_date) < new Date();

  const { editTask } = useTasks();

  const handleCompletionToggle = async () => {
    try {
      await editTask(task.id, { is_completed: !task.is_completed });
    } catch (err) {
      console.error("Failed to update task:", err.message);
    }
  };

  return (
    <div
      key={task.id}
      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm relative flex flex-col"
    >
      {confirmingDeleteIds[task.id] && (
        <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center p-4 rounded-lg shadow-md z-10">
          <p className="text-gray-800 mb-4 font-medium">Delete this task?</p>
          <div className="flex gap-4">
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
            >
              Yes
            </button>
            <button
              onClick={() =>
                setConfirmingDeleteIds((prev) => {
                  const updated = { ...prev };
                  delete updated[task.id];
                  return updated;
                })
              }
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
            >
              No
            </button>
          </div>
        </div>
      )}

      {expandedTaskId === task.id && (
        <ExpandedTask
          task={task}
          setExpandedTaskId={setExpandedTaskId}
          handleCompletionToggle={handleCompletionToggle}
        />
      )}

      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
          {task.title}
        </h3>
        <div className="flex items-center gap-1">
          {isOverdue ? (
            <span className="text-sm px-2 py-1 rounded-md font-medium bg-red-100 text-red-700">
              Overdue
            </span>
          ) : (
            <span
              className={`text-sm px-2 py-1 rounded-md font-medium ${
                task.is_completed
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {task.is_completed ? "Completed" : "Pending"}
            </span>
          )}

          <button
            onClick={() =>
              setExpandedTaskId((prev) => (prev === task.id ? null : task.id))
            }
            className="text-xl font-bold cursor-pointer bg-white p-1 rounded-md hover:bg-gray-200 transition"
            title="Expand Task"
            aria-label="Expand Task"
          >
            ⛶
          </button>
          <button
            onClick={() =>
              setConfirmingDeleteIds((prev) => ({ ...prev, [task.id]: true }))
            }
            className="cursor-pointer bg-white p-1 rounded-md hover:bg-gray-200 transition"
            title="Delete Task"
            aria-label="Delete Task"
          >
            ❌
          </button>
        </div>
      </div>

      <p className="text-gray-800 text-sm whitespace-pre-wrap mb-2 overflow-y-auto max-h-20">
        {task.description}
      </p>

      <div className="mt-auto">
        <p className="text-sm text-gray-500 mt-auto mb-2">
          📅 Due: <span className="font-medium">{dueDate}</span>
        </p>

        <label className="flex items-center gap-3 cursor-pointer">
          <span className="text-sm font-medium text-gray-700">
            {task.is_completed ? "Completed" : "Pending"}
          </span>
          <div className="relative inline-flex items-center">
            <input
              type="checkbox"
              checked={task.is_completed}
              onChange={handleCompletionToggle}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer-checked:bg-blue-600 transition-all"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default TaskCard;
