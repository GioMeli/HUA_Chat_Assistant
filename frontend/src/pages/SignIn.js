import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for HTTP requests

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post("http://localhost:3000/api/auth/SignIn", {
        username,
        password,
      });

      if (response.data.success) {
        navigate("/Chat"); // Navigate if login is successful
      } else {
        setError("Invalid username or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid username or password.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <h1 style={styles.title}>Rental Properties Application</h1>
        <div style={styles.loginBox}>
          <h2 style={styles.loginTitle}>Sign In</h2>
          {error && <div style={styles.error}>{error}</div>}
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              style={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" style={styles.button}>Login</button>
          </form>
          <div style={styles.signupContainer}>
            <span style={styles.signupText}>
              If you don't have an account, create account here:
            </span>
            <button 
              style={styles.signupButton}
              onClick={() => navigate("/signup")}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundImage: "url('https://images2.alphacoders.com/663/663602.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 50, 0.8)",
    padding: "40px",
    borderRadius: "10px",
    textAlign: "center",
    width: "450px",
  },
  title: {
    color: "white",
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "30px",
  },
  loginBox: {
    backgroundColor: "navy",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
  },
  loginTitle: {
    color: "white",
    fontSize: "28px",
    marginBottom: "20px",
  },
  input: {
    width: "90%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    width: "95%",
    padding: "12px",
    backgroundColor: "#ffcc00",
    color: "black",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
  signupContainer: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  signupText: {
    color: "white",
    fontSize: "14px",
    marginBottom: "10px",
  },
  signupButton: {
    backgroundColor: "#ffcc00",
    color: "black",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },
};

export default SignIn;

