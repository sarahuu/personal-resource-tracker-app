import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axiosInstance from "../axiosInstance";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post("/auth/token", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.access_token);
      const v_username = response.data.username;
      navigate(`/dashboard/${v_username}`);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="flex w-full h-full bg-gray-800">
        <div className="w-full flex items-center justify-center lg:w-1/2 border-r border-gray-700">
          <div className="w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100 mt-10 mb-10">
            <h1 className="text-5xl font-semibold text-gray-700">Welcome Back</h1>
            <p className="font-medium text-lg text-gray-300 mt-4">
              Welcome back! Please enter your details.
            </p>
            <div className="mt-8">
              <div className="flex flex-col">
                <label className="text-lg font-medium">Username</label>
                <input
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border-2 border-gray-600 text-gray-700 font-medium text-lg rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Enter your username"
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className="text-lg font-medium">Password</label>
                <input
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-2 border-gray-600 text-gray-700 font-medium text-lg rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Enter your password"
                  type={"password"}
                />
              </div>
              <div className="mt-8 flex flex-col gap-y-4">
                <button
                  type="submit"
                  className="flex items-center justify-center active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 100 8H4z"
                      ></path>
                    </svg>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
              <div className="mt-8 flex justify-center items-center">
                <p className="font-medium text-base">Don't have an account?</p>
                <button
                  onClick={() => navigate("/signup")}
                  className="ml-2 font-medium text-base text-violet-500"
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden relative w-1/2 lg:flex items-center justify-center bg-gray-800">
          <div className="w-60 h-60 rounded-full bg-gradient-to-tr from-violet-500 to-pink-500 animate-spin" />
          <div className="w-full h-1/2 absolute bottom-0 bg-white/0 backdrop-blur-lg" />
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
