import React, { useState } from "react";
import axios from "axios";
import { BASE_URI } from "../App";
const Registration = () => {
  const [first_name, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [last_name, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

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
    } catch (error) {
      console.error("Registration failed:", error.response.data.error);
      setMessage(error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          value={first_name}
          onChange={(e) => setFirstname(e.target.value)}
          placeholder="First Name"
          required
        />
        <input
          value={last_name}
          onChange={(e) => setLastname(e.target.value)}
          placeholder="Last Name"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Registration;
