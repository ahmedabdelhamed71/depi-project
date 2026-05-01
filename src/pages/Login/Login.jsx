import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Login = () => {
   const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (loginInfo.email.trim() === "" || loginInfo.password.trim() === "") {
      setError("Please fill all fields");
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      setError("No account found, please register first");
      return;
    }

    if (
      savedUser.email === loginInfo.email &&
      savedUser.password === loginInfo.password
    ) {
      setError("");
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <form 
        onSubmit={handleLogin}
        className="bg-white text-gray-500 max-w-[350px] mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10"
      >
        
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Login Now
        </h2>

        <input
          name="email"
          value={loginInfo.email}
          onChange={handleChange}
          className="w-full border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
          type="email"
          placeholder="Enter your email"
        />

        <input
          name="password"
          value={loginInfo.password}
          onChange={handleChange}
          className="w-full border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
          type="password"
          placeholder="Enter your password"
        />

        <div className="text-right py-4">
          <Link to="/wrong-page" className="text-blue-600 underline">
            Forgot Password
          </Link>
        </div>

        {error && (
          <p className="text-red-500 text-center mb-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600/90 active:scale-95 transition py-2.5 rounded-full text-white"
        >
          Log in
        </button>

        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 underline">
            Sign up Now
          </Link>
        </p>

      </form>
    </div>
  );
};

export default Login
