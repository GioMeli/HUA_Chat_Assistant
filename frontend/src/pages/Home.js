// src/components/Home.js
import React, { useState } from "react";
import "../public/styles.css";

const Home = ({ onSignIn, onRegister, onGuest }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="home-container">
      <h1 className="title">Welcome to HUA Chat Assistant</h1>
      <div className="login-box">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="buttons">
          <button onClick={() => onSignIn(username, password)}>Sign In</button>
          <button onClick={() => onRegister(username, password)}>Create Account</button>
          <button className="guest-btn" onClick={onGuest}>Continue as Guest</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
