import { createContext, useContext, useState } from "react";
import {
  getRowsFromTableByUserId,
  addRowInTable,
  updateRowInTableById,
  deleteRowInTableById,
} from "../services/dbService";
import { useUser } from "./UserContext";

const TasksContext = createContext();

export const useTasks = () => useContext(TasksContext);

export const TasksProvider = ({ children }) => {
  const user = useUser();
  const [tasks, setTasks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadTasks = async () => {
    if (!user) return;
    if (isLoaded) return;
    setLoading(true);
    try {
      const data = await getRowsFromTableByUserId("tasks", user.id);
      setTasks(data);
      setIsLoaded(true);
    } catch (err) {
      console.error("Failed to fetch tasks:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (
    title,
    description,
    due_date,
    is_completed = false
  ) => {
    try {
      const newTask = await addRowInTable("tasks", {
        user_id: user.id,
        title,
        description,
        due_date,
        is_completed,
      });
      setTasks((prev) => [newTask, ...prev]);
    } catch (err) {
      console.error("Add task failed:", err.message);
    }
  };

  const editTask = async (taskId, updatedTaskObj) => {
    try {
      const newTask = await updateRowInTableById(
        "tasks",
        taskId,
        updatedTaskObj
      );
      setTasks((prev) => prev.map((n) => (n.id === taskId ? newTask : n)));
    } catch (err) {
      console.error("Edit task failed:", err.message);
    }
  };

  const removeTask = async (id) => {
    try {
      await deleteRowInTableById("tasks", id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Delete task failed:", err.message);
    }
  };

  return (
    <TasksContext.Provider
      value={{ tasks, loading, loadTasks, createTask, editTask, removeTask }}
    >
      {children}
    </TasksContext.Provider>
  );
};
