import React, { useState } from "react";
import axios from "axios";

const Register = ({ onRegisterSuccess }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async () => {
        try {
            const response = await axios.post("http://localhost:5000/register", {
                username,
                password
            });

            setMessage(response.data.message);
            if (response.status === 201) {
                onRegisterSuccess(); // Redirect to Sign In
            }
        } catch (error) {
            setMessage(error.response?.data.message || "Registration failed");
        }
    };

    return (
        <div>
            <h2>Create Account</h2>
            <input
                type="text"
                placeholder="Username (must start with 'it')"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
            <p>{message}</p>
        </div>
    );
};

export default Register;


