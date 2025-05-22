import { useState } from "react";
import Modal from "../Modal";
import EditNote from "./EditNote";

const ExpandedNote = ({ note, setExpandedNoteId }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Modal isOpen={true} onClose={() => setExpandedNoteId(null)}>
      <div className="p-6">
        {!isEditMode ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">{note.title}</h3>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsEditMode(true)}
                  className="cursor-pointer p-1 rounded-md hover:bg-gray-200 transition"
                  title="Edit Note"
                >
                  ✏️
                </button>
                <button
                  onClick={() => setExpandedNoteId(null)}
                  className="cursor-pointer p-1 rounded-md hover:bg-gray-200 transition"
                  title="Close Note"
                >
                  ✖
                </button>
              </div>
            </div>
            <p className="text-gray-800 whitespace-pre-wrap overflow-y-auto max-h-[60vh]">
              {note.content}
            </p>
          </>
        ) : (
          <EditNote note={note} setIsEditMode={setIsEditMode} />
        )}
      </div>
    </Modal>
  );
};

export default ExpandedNote;
