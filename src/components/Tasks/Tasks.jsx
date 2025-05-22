import { useEffect, useRef, useState } from "react";
import AddTask from "./AddTask";
import TaskCard from "./TaskCard";
import { useTasks } from "../../contexts/TasksContext";

const Tasks = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [confirmingDeleteIds, setConfirmingDeleteIds] = useState({});

  const loaderRef = useRef(null);

  const {
    loading,
    hasMore,
    pageLoaded,
    page,
    setPage,
    loadTasks,
    tasks,
    removeTask,
  } = useTasks();

  useEffect(() => {
    if (page > pageLoaded) {
      loadTasks();
    }
  }, [page, pageLoaded, loadTasks]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (pageLoaded < 0 || !hasMore || loading) return;

      const [entry] = entries;
      if (entry.isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loading, pageLoaded, hasMore, setPage]);

  const handleDeleteTask = async (id) => {
    try {
      await removeTask(id);
    } catch (err) {
      console.error("Delete task failed:", err.message);
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
        <h2 className="text-2xl font-semibold text-gray-700">My Tasks</h2>
        <button
          onClick={() => setShowAddTask(true)}
          className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
        >
          Add New Task
        </button>
      </div>

      <button
        onClick={() => setShowAddTask(true)}
        className="fixed bottom-6 right-6 md:hidden bg-blue-600 text-white text-3xl font-bold w-14 h-14 rounded-full shadow-lg hover:bg-blue-700 transition z-50"
        title="Add Task"
      >
        +
      </button>

      {showAddTask && (
        <AddTask
          showAddTask={showAddTask}
          setShowAddTask={setShowAddTask}
        ></AddTask>
      )}

      <div className="px-6 grid gap-4 grid-cols-1 lg:grid-cols-2 min-[120rem]:grid-cols-3 min-[150rem]:grid-cols-4">
        {loading && (
          <div className="col-span-full flex justify-center items-center h-32">
            <p className="text-gray-600 font-medium text-xl">
              ⏳Loading tasks...
            </p>
          </div>
        )}
        {!loading && tasks.length === 0 && (
          <div className="col-span-full flex justify-center items-center h-32">
            <p className="text-gray-500">No tasks added yet.</p>
          </div>
        )}

        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            handleDeleteTask={handleDeleteTask}
            confirmingDeleteIds={confirmingDeleteIds}
            setConfirmingDeleteIds={setConfirmingDeleteIds}
          ></TaskCard>
        ))}

        {hasMore && pageLoaded >= 0 && (
          <div
            ref={loaderRef}
            className="col-span-full flex justify-center items-center h-10"
          >
            {loading && (
              <p className="text-gray-600 font-medium text-sm">
                ⏳Loading more...
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Tasks;
