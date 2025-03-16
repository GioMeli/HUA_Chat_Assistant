const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Ensure correct DB connection

const register = async (req, res) => {
    const { username, password } = req.body;

    if (!username.startsWith("it")) {
        return res.status(400).json({ message: "Username must start with 'it'." });
    }
    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Check if user exists
        const [existingUser] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "Username already taken." });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert into DB
        await db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);

        res.status(201).json({ message: "Registration successful!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error. Try again later." });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const [user] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
        if (user.length === 0) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const validPassword = await bcrypt.compare(password, user[0].password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user[0].id, username: user[0].username }, process.env.SECRET_KEY, { expiresIn: "1h" });

        res.json({ message: "Login successful!", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
};

const logout = (req, res) => {
    res.json({ message: "Logged out successfully." });
};

module.exports = { register, login, logout };

