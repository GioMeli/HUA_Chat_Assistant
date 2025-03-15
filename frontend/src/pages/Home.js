import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css"; // Ensure the correct path for your CSS

const Home = ({ onSignIn, onGuest }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook to navigate to Register page

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
          <button className="primary-btn" onClick={() => onSignIn(username, password)}>
            Sign In
          </button>
          <button className="secondary-btn" onClick={() => navigate("/register")}>
            Create Account
          </button>
          <button className="guest-btn" onClick={onGuest}>
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

