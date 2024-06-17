import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "../App.css";

const Login = () => {
  // State variables to store username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        // Show alert if login fails
        alert("Wrong username or password");
        return;
      }

      const { token } = await response.json();

      // Store token in local storage
      localStorage.setItem("token", token);

      // Redirect to profile page
      navigate("/profile");

      // Refresh the page
      window.location.reload();
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  

  return (
    <div className="login-container" style={{ marginTop: "50px" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div style={{ paddingTop: "20px" }}>
        <Link to="/signup">
          <button type="button">Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
