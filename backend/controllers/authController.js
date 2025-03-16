const db = require("../config/db");

const register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        // Insert user directly into the database without hashing
        const [result] = await db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, password]);

        if (result.affectedRows === 1) {
            return res.status(201).json({ message: "User registered successfully" });
        } else {
            return res.status(500).json({ message: "Failed to register user" });
        }
    } catch (error) {
        console.error("Database error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = { register };

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        const [users] = await db.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password]);

        if (users.length > 0) {
            return res.status(200).json({ message: "Login successful", user: users[0] });
        } else {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Database error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = { register, login };


