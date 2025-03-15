import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for API requests
import "../styles.css"; // Ensure the correct path for your CSS

const Home = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook to navigate to other pages

  // Handle Sign In
  const handleSignIn = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      if (response.data.message === "Login successful") {
        navigate("/chat"); // Redirect to Chat page
      } else {
        alert("Invalid username or password!"); // Show warning
      }
    } catch (error) {
      alert("Invalid username or password!"); // Show warning
    }
  };

  // Handle Continue as Guest
  const handleGuest = () => {
    navigate("/chat"); // Redirect to Chat page
  };

  return (
    <div className="home-container">
      <div className="login-box">
        <h1 className="title">Welcome to HUA Chat Assistant</h1>
        <p className="subtitle">Your AI-powered chat companion</p>

        <input
          type="text"
          placeholder="Enter your Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />

        <div className="buttons">
          <button className="primary-btn" onClick={handleSignIn}>
            Sign In
          </button>
          <button className="secondary-btn" onClick={() => navigate("/register")}>
            Create Account
          </button>
          <button className="guest-btn" onClick={handleGuest}>
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;


