

const db = require("../config/db");

const register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        const [existingUser] = await db.query("SELECT * FROM users WHERE username = ?", [username]);

        if (existingUser.length > 0) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const result = await db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, password]);

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

