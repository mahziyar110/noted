import { useState } from "react";
import Notes from "../components/Notes/Notes";
import Tasks from "../components/Tasks/Tasks";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("notes");

  return (
    <div className="min-h-[calc(100vh-4rem)] flex w-full bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed z-10 h-[calc(100vh-4rem)] hidden md:flex md:w-64 w-64 bg-white shadow-md border-r border-gray-200 p-6 flex-col gap-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Dashboard</h2>
        <button
          onClick={() => setActiveTab("notes")}
          className={`text-left px-4 py-2 rounded-lg font-medium ${
            activeTab === "notes"
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-100 text-gray-700 cursor-pointer"
          }`}
        >
          Notes
        </button>
        <button
          onClick={() => setActiveTab("tasks")}
          className={`text-left px-4 py-2 rounded-lg font-medium ${
            activeTab === "tasks"
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-100 text-gray-700 cursor-pointer"
          }`}
        >
          Tasks
        </button>
      </aside>

      <div className="flex-1 flex flex-col md:pl-64">
        {/* Topbar - visible only on small screens */}
        <div className="flex md:hidden justify-start gap-4 bg-white shadow mb-2 px-4 py-2 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("notes")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === "notes"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            Notes
          </button>
          <button
            onClick={() => setActiveTab("tasks")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === "tasks"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            Tasks
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === "notes" ? <Notes /> : <Tasks />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
