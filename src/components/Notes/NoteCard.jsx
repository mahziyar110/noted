import { useState } from "react";
import ExpandedNote from "./ExpandedNote";

const NoteCard = ({
  note,
  handleDeleteNote,
  confirmingDeleteIds,
  setConfirmingDeleteIds,
}) => {
  const [expandedNoteId, setExpandedNoteId] = useState(null);

  return (
    <div
      key={note.id}
      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm relative"
    >
      {confirmingDeleteIds[note.id] && (
        <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center p-4 rounded-lg shadow-md z-10">
          <p className="text-gray-800 mb-4 font-medium">Delete this note?</p>
          <div className="flex gap-4">
            <button
              onClick={() => handleDeleteNote(note.id)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
            >
              Yes
            </button>
            <button
              onClick={() =>
                setConfirmingDeleteIds((prev) => {
                  const updated = { ...prev };
                  delete updated[note.id];
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

      {expandedNoteId === note.id && (
        <ExpandedNote note={note} setExpandedNoteId={setExpandedNoteId} />
      )}

      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-gray-900">{note.title}</h3>
        <div className="flex items-center gap-1">
          <button
            onClick={() =>
              setExpandedNoteId((prev) => (prev === note.id ? null : note.id))
            }
            className="text-xl font-bold cursor-pointer bg-white p-1 rounded-md hover:bg-gray-200 transition"
            title="Expand Note"
          >
            ⛶
          </button>
          <button
            onClick={() =>
              setConfirmingDeleteIds((prev) => ({
                ...prev,
                [note.id]: true,
              }))
            }
            className="cursor-pointer bg-white p-1 rounded-md hover:bg-gray-200 transition"
            title="Delete Note"
          >
            ❌
          </button>
        </div>
      </div>
      <p className="text-gray-800 whitespace-pre-wrap overflow-y-auto max-h-40">
        {note.content}
      </p>
    </div>
  );
};

export default NoteCard;
