import { useState } from "react";
import Modal from "../Modal";
import { useNotes } from "../../contexts/NotesContext";

const AddNote = ({ showAddNote, setShowAddNote }) => {
  const [titleInput, setTitleInput] = useState("");
  const [noteInput, setNoteInput] = useState("");
  const [loading, setLoading] = useState(false);

  const { createNote } = useNotes();

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteInput.trim()) return;
    setLoading(true);
    try {
      await createNote(titleInput, noteInput);
      setTitleInput("");
      setNoteInput("");
      setShowAddNote(false);
    } catch (err) {
      console.error("Add note failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={showAddNote} onClose={() => setShowAddNote(false)}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">New Note</h3>
          <button
            onClick={() => setShowAddNote(false)}
            className=" text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            ✖
          </button>
        </div>
        <form onSubmit={handleAddNote} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              placeholder="Enter title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Content
            </label>
            <textarea
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              required
              placeholder="Write your note..."
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save Note"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddNote;
