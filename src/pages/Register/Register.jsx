import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Register = () => {
const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const userSubmit = (e) => {
    e.preventDefault();

    if (userInfo.username.trim() === "") {
      setError("Username is required");
      return;
    }

    if (userInfo.email.trim() === "") {
      setError("Email is required");
      return;
    }

    if (!userInfo.email.includes("@")) {
      setError("Email is not valid");
      return;
    }

    if (userInfo.password.trim() === "") {
      setError("Password is required");
      return;
    }

    if (userInfo.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setError("");

    localStorage.setItem("user", JSON.stringify(userInfo));

    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form 
        onSubmit={userSubmit}
        className="bg-white text-gray-500 w-full max-w-[340px] mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10"
      >
        
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Sign Up
        </h2>

        <input
          name="username"
          value={userInfo.username}
          onChange={handleChange}
          className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
          type="text"
          placeholder="Username"
        />

        <input
          name="email"
          value={userInfo.email}
          onChange={handleChange}
          className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
          type="email"
          placeholder="Email"
        />

        <input
          name="password"
          value={userInfo.password}
          onChange={handleChange}
          className="w-full border mt-1 bg-indigo-500/5 mb-7 border-gray-500/10 outline-none rounded py-2.5 px-3"
          type="password"
          placeholder="Password"
        />

        {error && (
          <p className="text-red-500 text-center mb-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium"
        >
          Create Account
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>

      </form>
    </div>
  );
};


export default Register