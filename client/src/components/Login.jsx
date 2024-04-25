import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { BASE_URI } from "../App";
import { motion } from "framer-motion";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null); // New state for handling error messages
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URI}` + "user/login/", {
        email,
        password,
      });
      setToken(response.data.access_token);
      localStorage.setItem("access_token", response.data.access_token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Authentication failed:", error);
      setToken(null);
      localStorage.removeItem("access_token");
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data); // Set the error message if present in the error response
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-ash-black  p-8 rounded-lg shadow-md w-96 space-y-6 ">
        <h2 className="text-center text-orange text-3xl font-bold">Login</h2>
        {errorMessage && (
          <div style={{ color: "red" }}>{errorMessage}</div>
        )}{" "}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="block w-full rounded-md border-blacky-300 px-3 py-2 focus:outline focus:ring-primary-500 focus:border-primary-500 placeholder-blacky  bg-tertiary"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="block w-full rounded-md border-blacky-300 px-3 py-2 focus:outline focus:ring-primary-500 focus:border-primary-500 placeholder-blacky  bg-tertiary"
          />
          <button className="px-12 py-4 rounded-full bg-orange font-bold text-white tracking-widest uppercase transform hover:scale-105 hover:bg-orange transition-colors duration-200">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
