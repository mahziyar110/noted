import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setError(error.message);
    } else {
      alert("Password reset successful!");
      await supabase.auth.signOut(); // Sign out the user after password reset
      navigate("/login"); // Redirect to login page after successful reset
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-200 space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Reset Your Password
        </h2>
        {error && (
          <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <br />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <br />
          <button
            type="submit"
            disabled={
              !newPassword ||
              !confirmPassword ||
              newPassword !== confirmPassword
            }
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
