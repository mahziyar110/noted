import { useState, useEffect, useRef } from "react";
import {
  SparklesIcon,
  PaperAirplaneIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";
import Modal from "./Modal";
import { createChatSession, sendMessage } from "../services/aiService";

const AITextArea = ({
  inputValue,
  onChange,
  placeholder = "Type here...",
  required = true,
  rows = 4,
  className = "w-full px-4 py-2 pr-8 border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400",
} = {}) => {
  const initialInputRef = useRef("");
  const AIchat = useRef(null);

  const [isAIMode, setAIMode] = useState(false);
  const [aiResponse, setAIResponse] = useState("");
  const [aiQuery, setAIQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAIMode) {
      setAIQuery("");
      setAIResponse(inputValue || "");
      setError(null);
      initialInputRef.current = inputValue || "";
      AIchat.current = null;
    }
  }, [isAIMode]);

  function discardChanges() {
    onChange(initialInputRef.current);
    AIchat.current = null;
    setAIMode(false);
  }

  function saveChanges() {
    onChange(aiResponse);
    AIchat.current = null;
    setAIMode(false);
  }

  function handleAIQuery() {
    if (!aiQuery.trim() || isLoading) return;
    if (!AIchat.current) {
      AIchat.current = createChatSession(aiResponse);
    }
    setError(null);
    setLoading(true);
    const prompt = `Current Content:\n${aiResponse}\n\n\nUser Request:\n${aiQuery}`;
    sendMessage(AIchat.current, prompt)
      .then((response) => {
        setAIResponse(response);
        setAIQuery("");
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to generate response.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="relative">
      <textarea
        value={inputValue}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        rows={rows}
        className={className}
      />
      <button
        type="button"
        title="AI Assistant"
        className="absolute top-2 right-2 p-1 rounded text-yellow-600 hover:text-blue-700 hover:scale-110 transition cursor-pointer"
        onClick={() => setAIMode(true)}
      >
        <SparklesIcon className="w-6 h-6" />
      </button>

      <Modal isOpen={isAIMode} onClose={discardChanges}>
        <div className="p-6 space-y-4">
          <h3 className="text-xl font-bold text-gray-800">AI Assistant</h3>
          <textarea
            value={aiResponse}
            disabled={isLoading}
            onChange={(e) => setAIResponse(e.target.value)}
            rows={Math.min(8, rows)}
            className={className}
          />
          <div className="relative">
            <input
              type="text"
              value={aiQuery}
              disabled={isLoading}
              onChange={(e) => setAIQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAIQuery();
                }
              }}
              placeholder="Summarize, enhance, change tone, generate ideas, etc..."
              className={`${className} pr-10`}
            />
            <button
              type="button"
              title="Ask AI"
              disabled={!aiQuery.trim() || isLoading}
              className="absolute right-1 top-1/2 -translate-y-1/2 p-1 rounded text-blue-600 hover:text-blue-700 hover:scale-110 transition cursor-pointer disabled:pointer-events-none disabled:opacity-50"
              onClick={handleAIQuery}
            >
              <PaperAirplaneIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="flex items-center gap-1">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {isLoading && (
              <div className="flex items-center text-gray-500 gap-2">
                <ArrowPathIcon className="w-5 h-5 animate-spin" />
                <span>Generating response...</span>
              </div>
            )}
            <div className="ml-auto flex gap-1">
              <button
                type="button"
                onClick={discardChanges}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition cursor-pointer"
              >
                Discard
              </button>
              <button
                type="button"
                disabled={
                  !aiResponse.trim() ||
                  aiResponse === initialInputRef.current ||
                  isLoading ||
                  error
                }
                onClick={saveChanges}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AITextArea;
