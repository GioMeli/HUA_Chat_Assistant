import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        const response = await fetch("http://localhost:5000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/chat");
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="container">
            <h2>Welcome to HUA Chat Assistant</h2>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Sign In</button>
            <button onClick={() => navigate("/register")}>Create Account</button>
            <button onClick={() => navigate("/chat")}>Continue as Guest</button>
        </div>
    );
}

export default Home;

