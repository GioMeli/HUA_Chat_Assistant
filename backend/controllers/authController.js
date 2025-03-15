const db = require("../db");
const bcrypt = require("bcryptjs");

// REGISTER USER
exports.register = async (req, res) => {
    const { username, password } = req.body;

    if (!username.startsWith("it")) {
        return res.status(400).json({ message: 'Username must start with "it"' });
    }

    try {
        // Check if user already exists
        const [existingUsers] = await db.promise().query("SELECT * FROM users WHERE username = ?", [username]);

        if (existingUsers.length > 0) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to database
        await db.promise().query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);

        res.status(201).json({ message: "Account created, please Sign In" });
    } catch (error) {
        console.error("Error in registration:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

// LOGIN USER
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [users] = await db.promise().query("SELECT * FROM users WHERE username = ?", [username]);

        if (users.length === 0) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const user = users[0];

        // Compare hashed passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Set user session
        req.session.user = { id: user.id, username: user.username };

        res.json({ message: "Login successful", user: req.session.user });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

// LOGOUT USER
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Logout failed", error: err });
        }
        res.json({ message: "Logged out successfully" });
    });
};

