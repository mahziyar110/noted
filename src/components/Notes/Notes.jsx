import { useEffect, useState } from "react";
import AddNote from "./AddNote";
import NoteCard from "./NoteCard";
import { useNotes } from "../../contexts/NotesContext";

const Notes = () => {
  const [showAddNote, setShowAddNote] = useState(false);
  const [confirmingDeleteIds, setConfirmingDeleteIds] = useState({});

  const { loading, loadNotes, notes, removeNote } = useNotes();

  useEffect(() => {
    loadNotes();
  }, []);

  const handleDeleteNote = async (id) => {
    try {
      await removeNote(id);
    } catch (err) {
      console.error("Delete note failed:", err.message);
    } finally {
      setConfirmingDeleteIds((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    }
  };

  return (
    <>
      <div className="hidden md:flex items-center justify-between mb-4 sticky top-0 bg-gray-100 shadow-md px-6 py-4 z-10">
        <h2 className="text-2xl font-semibold text-gray-700">My Notes</h2>
        <button
          onClick={() => setShowAddNote(true)}
          className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
        >
          Add New Note
        </button>
      </div>

      <button
        onClick={() => setShowAddNote(true)}
        className="fixed bottom-6 right-6 md:hidden bg-blue-600 text-white text-3xl font-bold w-14 h-14 rounded-full shadow-lg hover:bg-blue-700 transition z-50"
        aria-label="Add Note"
      >
        +
      </button>

      {showAddNote && (
        <AddNote
          showAddNote={showAddNote}
          setShowAddNote={setShowAddNote}
        ></AddNote>
      )}

      <div className="px-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3 min-[120rem]:grid-cols-4 min-[150rem]:grid-cols-5">
        {loading && (
          <div className="col-span-full flex justify-center items-center h-32">
            <p className="text-gray-600 font-medium text-xl">
              ⏳Loading notes...
            </p>
          </div>
        )}
        {!loading && notes.length === 0 && (
          <div className="col-span-full flex justify-center items-center h-32">
            <p className="text-gray-500">No notes added yet.</p>
          </div>
        )}

        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            handleDeleteNote={handleDeleteNote}
            confirmingDeleteIds={confirmingDeleteIds}
            setConfirmingDeleteIds={setConfirmingDeleteIds}
          ></NoteCard>
        ))}
      </div>
    </>
  );
};

export default Notes;
