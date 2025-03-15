const db = require("../db");
const bcrypt = require("bcryptjs"); // Import bcrypt for password hashing

// REGISTER USER
exports.register = async (req, res) => {
    const { username, password } = req.body;

    if (!username.startsWith("it")) {
        return res.status(400).json({ message: 'Username must start with "it"' });
    }

    try {
        // Check if user already exists
        db.query("SELECT * FROM users WHERE username = ?", [username], async (err, result) => {
            if (err) return res.status(500).json({ message: "Database error", error: err });

            if (result.length > 0) {
                return res.status(400).json({ message: "Username already exists" });
            }

            // Hash the password before saving
            const hashedPassword = await bcrypt.hash(password, 10);

            // Save user to database
            const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
            db.query(sql, [username, hashedPassword], (err) => {
                if (err) return res.status(500).json({ message: "Database error", error: err });
                res.status(201).json({ message: "Account created, please Sign In" });
            });
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// LOGIN USER
exports.login = (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql, [username], async (err, result) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });

        if (result.length === 0) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const user = result[0];

        // Compare hashed passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Set user session
        req.session.user = { id: user.id, username: user.username };
        res.json({ message: "Login successful", user: req.session.user });
    });
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
