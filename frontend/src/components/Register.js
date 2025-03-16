import { useState } from "react";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        // Ensure both fields are filled
        if (!username || !password) {
            setMessage("Please enter both username and password.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }), // Sending raw username and password
            });

            const data = await response.json();
            setMessage(data.message);

            if (response.ok) {
                setUsername(""); // Clear input fields
                setPassword("");
            }
        } catch (error) {
            setMessage("Server error. Please try again later.");
            console.error("Registration error:", error);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleRegister}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Create Account</button>
            </form>
        </div>
    );
};

export default Register;
