import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 px-2 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        Organize Your Mind with Clarity ✨
      </h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-6">
        Your personal space for notes and to-dos — all in one place. Stay
        productive, stay focused, and never miss a thought or task again.
      </p>
      <p className="text-md md:text-lg text-gray-500 max-w-xl mb-10">
        Fast, secure, and distraction-free. Whether you're planning your day or
        jotting down ideas, our simple dashboard keeps everything at your
        fingertips.
      </p>
      <Link
        to="/login"
        className="bg-gray-800 hover:bg-gray-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition"
      >
        Get Started
      </Link>
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 px-6 max-w-5xl mx-auto">
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">📝 Notes</h3>
          <p className="text-gray-600">
            Capture ideas and thoughts on your mind. Simple and distraction-free
            note-taking made easy.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">
            ✅ To-Dos
          </h3>
          <p className="text-gray-600">
            Manage your daily tasks with a clean and simple checklist. Mark them
            done with a click.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">
            🔒 Private & Secure
          </h3>
          <p className="text-gray-600">
            Your data is safe and tied to your account — accessible only by you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
