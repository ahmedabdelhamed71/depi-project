import React from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MdOutlineSwapCalls } from "react-icons/md";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../context/context";


const Schema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Email is not valid"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
  });

  const userSubmit = async (data) => {
    try {
      const req = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const res = await req.json();

      if (!req.ok) {
        alert(res.msg || "Login failed");
        return;
      }

      login(res.user);
      navigate("/");
    } catch (e) {
      console.log(e.message);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(userSubmit)}
        className="bg-white text-gray-500 w-full max-w-[430px] mx-4 md:p-8 p-6 py-10 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <MdOutlineSwapCalls className="text-indigo-600 text-3xl" />

          <h2 className="text-2xl font-bold text-gray-800">SkillSwap</h2>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h1>

        <h6 className="text-sm font-normal text-center text-gray-400 mb-6">
          Log in to continue your learning journey
        </h6>

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>

        <input
          {...register("email")}
          className="w-full h-11 border border-gray-200 bg-white rounded-xl px-4 outline-none text-gray-700 placeholder:text-gray-400 mb-2"
          type="email"
          placeholder="you@example.com"
        />

        {errors.email && (
          <p className="text-red-500 text-xs mb-2">{errors.email.message}</p>
        )}

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>

        <input
          {...register("password")}
          className="w-full h-11 border border-gray-200 bg-white rounded-xl px-4 outline-none text-gray-700 placeholder:text-gray-400 mb-2"
          type="password"
          placeholder="Enter your password"
        />

        {errors.password && (
          <p className="text-red-500 text-xs mb-2">
            {errors.password.message}
          </p>
        )}

        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" className="w-4 h-4 accent-indigo-500" />
            Remember me
          </label>

          <Link to="*" className="text-indigo-600 hover:underline">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium"
        >
          Log In
        </button>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login