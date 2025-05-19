import { useState } from "react";
import { useNotes } from "../../contexts/NotesContext";

const EditNote = ({ note, setIsEditMode }) => {
  const [titleInput, setTitleInput] = useState(note.title);
  const [contentInput, setContentInput] = useState(note.content);
  const [loading, setLoading] = useState(false);

  const { editNote } = useNotes();

  const handleUpdateNote = async (e) => {
    e.preventDefault();
    if (!contentInput.trim()) return;
    setLoading(true);
    try {
      await editNote(note.id, titleInput, contentInput);
      setIsEditMode(false);
    } catch (err) {
      console.error("Update note failed:", err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">Edit Note</h3>
      </div>
      <form onSubmit={handleUpdateNote} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            type="text"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            placeholder="Enter title"
            autoFocus
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Content
          </label>
          <textarea
            value={contentInput}
            onChange={(e) => setContentInput(e.target.value)}
            required
            placeholder="Write your note..."
            rows="6"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex justify-end gap-1">
          <button
            type="button"
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition cursor-pointer"
            onClick={() => {
              setIsEditMode(false);
              setTitleInput(note.title);
              setContentInput(note.content);
            }}
          >
            Discard Changes
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Note"}
          </button>
        </div>
      </form>
    </>
  );
};

export default EditNote;
