const db = require('../db');

exports.register = (req, res) => {
    const { username, password } = req.body;
    if (!username.startsWith('it')) {
        return res.status(400).json({ message: 'Username must start with "it"' });
    }
    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.query(sql, [username, password], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Account created, please Sign In' });
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.query(sql, [username, password], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length > 0) {
            req.session.user = result[0];
            res.json({ message: 'Login successful', user: result[0] });
        } else {
            res.status(400).json({ message: 'Invalid credentials' });
        }
    });
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.json({ message: 'Logged out successfully' });
};

