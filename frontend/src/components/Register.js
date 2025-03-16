const db = require('../../config/db');

const register = async (req, res) => {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        // Insert user into the database WITHOUT hashing the password
        const result = await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);

        if (result.affectedRows === 1) {
            return res.status(201).json({ message: 'User registered successfully' });
        } else {
            return res.status(500).json({ message: 'Failed to register user' });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { register };

