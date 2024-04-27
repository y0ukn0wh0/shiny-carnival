import React, { useState } from "react";
import axios from "axios";
import { BASE_URI } from "../App";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Registration = () => {
  const [first_name, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [last_name, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URI}` + "user/register/", {
        first_name,
        email,
        last_name,
        password,
      });
      setMessage(response.data.message);
      toast.success("successfully registered");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Registration failed:", error.response.data.error);
      if (error.response && error.response.data.errors) {
        toast.error(`${error.response.data.errors.email}`);
      } else {
        setMessage(error.response.data.error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <ToastContainer
        position="top-right"
        autoClose={false}
        limit={1}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
        transition:Bounce
      />
      <div className=" bg-ash-black  p-8 rounded-lg  w-96 space-y-6">
        <h2 className="text-center text-orange text-3xl font-bold">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="block w-full rounded-md border-blacky-300 px-3 py-2 focus:outline focus:ring-primary-500 focus:border-primary-500 placeholder-blacky  bg-tertiary"
          />
          <input
            value={first_name}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="First Name"
            required
            className="block w-full rounded-md border-gray-300 px-3 py-2 focus:outline focus:ring-primary-500 focus:border-primary-500 placeholder-blacky  bg-tertiary"
          />
          <input
            value={last_name}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Last Name"
            className="block w-full rounded-md border-gray-300 px-3 py-2 focus:outline focus:ring-primary-500 focus:border-primary-500 placeholder-blacky  bg-tertiary"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="block w-full rounded-md border-gray-300 px-3 py-2 focus:outline focus:ring-primary-500 focus:border-primary-500 placeholder-blacky  bg-tertiary"
          />
          <button className="px-12 py-4 rounded-full bg-orange font-bold text-white tracking-widest uppercase transform hover:scale-105 hover:bg-orange transition-colors duration-200">
            Register
          </button>
        </form>
        <button
            onClick={() => {
              navigate("/login");
            }}
            className="text-orange px-1"
          >
            login
          </button>

        {/* <div>{message && <p>{message}</p>}</div> */}
      </div>
    </div>
  );
};

export default Registration;
