import { createContext, useContext, useState } from "react";
import {
  getRowsFromTableByUserId,
  addRowInTable,
  updateRowInTableById,
  deleteRowInTableById,
} from "../services/dbService";
import { useUser } from "./UserContext";

const NotesContext = createContext();

export const useNotes = () => useContext(NotesContext);

export const NotesProvider = ({ children }) => {
  const user = useUser();
  const [notes, setNotes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadNotes = async () => {
    if (!user) return;
    if (isLoaded) return;
    setLoading(true);
    try {
      const data = await getRowsFromTableByUserId("notes", user.id);
      setNotes(data);
      setIsLoaded(true);
    } catch (err) {
      console.error("Failed to fetch notes:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const createNote = async (title, content) => {
    try {
      const newNote = await addRowInTable("notes", {
        user_id: user.id,
        title,
        content,
      });
      setNotes((prev) => [newNote, ...prev]);
    } catch (err) {
      console.error("Add note failed:", err.message);
    }
  };

  const editNote = async (noteId, title, content) => {
    try {
      const newNote = await updateRowInTableById("notes", noteId, {
        title,
        content,
      });
      setNotes((prev) => prev.map((n) => (n.id === noteId ? newNote : n)));
    } catch (err) {
      console.error("Edit note failed:", err.message);
    }
  };

  const removeNote = async (id) => {
    try {
      await deleteRowInTableById("notes", id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("Delete note failed:", err.message);
    }
  };

  return (
    <NotesContext.Provider
      value={{ notes, loading, loadNotes, createNote, editNote, removeNote }}
    >
      {children}
    </NotesContext.Provider>
  );
};
