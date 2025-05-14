import React, { useState } from "react";
import { supabase } from "../../services/supabaseClient";

const ForgotPasswordForm = ({ setIsForgotPassword }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      alert("Password reset link sent to your email!");
      setIsForgotPassword(false);
    }
  };
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Reset Password
      </h2>

      <form onSubmit={handleForgotPassword} className="space-y-4">
        <input
          className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send Reset Link
        </button>
      </form>

      {error && (
        <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
      )}

      <div className="mt-4 text-sm text-center">
        <button
          onClick={() => {
            setIsForgotPassword(false);
            setError("");
          }}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
