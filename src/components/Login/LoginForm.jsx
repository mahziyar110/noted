import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabaseClient";

const LoginForm = ({ setIsLogin, setIsForgotPassword }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Welcome Back
      </h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Login
        </button>
      </form>

      {error && (
        <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
      )}

      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <span>Don't have an account?</span>
        <button
          onClick={() => {
            setIsLogin(false);
            setError("");
          }}
          className="text-blue-600 hover:underline font-medium ml-2 cursor-pointer"
        >
          Sign Up
        </button>
      </div>

      <div className="mt-4 text-sm text-center">
        <button
          onClick={() => {
            setIsForgotPassword(true);
            setError("");
          }}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Forgot Password?
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
