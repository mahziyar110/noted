import { useState } from "react";
import Modal from "../Modal";
import EditTask from "./EditTask";

const ExpandedTask = ({ task, setExpandedTaskId, handleCompletionToggle }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const dueDate = task.due_date
    ? new Date(task.due_date).toLocaleString()
    : "No due date";

  const isOverdue =
    !task.is_completed && task.due_date && new Date(task.due_date) < new Date();

  return (
    <Modal isOpen={true} onClose={() => setExpandedTaskId(null)}>
      {!isEditMode ? (
        <div
          className={`${
            isOverdue
              ? "bg-red-100"
              : task.is_completed
              ? "bg-green-100"
              : "bg-yellow-100"
          } p-6`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">{task.title}</h3>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsEditMode(true)}
                className="cursor-pointer p-1 rounded-md hover:bg-gray-200 transition"
                title="Edit Task"
              >
                ✏️
              </button>
              <button
                onClick={() => setExpandedTaskId(null)}
                className="cursor-pointer p-1 rounded-md hover:bg-gray-200 transition"
                title="Close Task"
              >
                ✖
              </button>
            </div>
          </div>

          <p className="text-gray-800 whitespace-pre-wrap overflow-y-auto max-h-[60vh] mb-6">
            {task.description || "No description provided."}
          </p>

          <p className="text-sm text-gray-500 mb-2">
            <span className="font-medium">Status:</span>{" "}
            {task.is_completed ? (
              <span className="text-green-700 font-medium">Completed</span>
            ) : isOverdue ? (
              <span className="text-red-600 font-medium">Overdue</span>
            ) : (
              <span className="text-yellow-700 font-medium">Pending</span>
            )}
          </p>

          <p className="text-sm text-gray-500 mb-2">
            <span className="font-medium">Due:</span> {dueDate}
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
      ) : (
        <EditTask task={task} setIsEditMode={setIsEditMode} />
      )}
    </Modal>
  );
};

export default ExpandedTask;
