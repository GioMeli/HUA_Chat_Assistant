import React, { useState } from "react"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // To navigate to Sign In after success

    const handleRegister = async () => {
        if (!username.startsWith("it")) {
            setMessage("Username must start with 'it'.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/register", {
                username,
                password
            });

            if (response.status === 201) {
                setMessage("Registration successful! Redirecting...");
                setTimeout(() => navigate("/"), 2000); // Redirect after 2 sec
            } else {
                setMessage(response.data.message || "Registration failed");
            }
        } catch (error) {
            console.error("Registration Error:", error);
            setMessage(error.response?.data?.message || "Registration failed. Try again.");
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

