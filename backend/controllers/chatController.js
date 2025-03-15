const db = require('../db');

exports.sendMessage = (req, res) => {
    const { message } = req.body;
    let response = "I am not sure about that.";

    if (message.toLowerCase().includes('exam')) {
        response = "Check the university website for the exam schedule.";
    } else if (message.toLowerCase().includes('library')) {
        response = "The university library is open from 8 AM to 8 PM.";
    }

    const sql = "INSERT INTO conversations (user_id, message, response) VALUES (?, ?, ?)";
    db.query(sql, [req.session.user.id, message, response], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ response });
    });
};

exports.getChatHistory = (req, res) => {
    const sql = "SELECT message, response, created_at FROM conversations WHERE user_id = ?";
    db.query(sql, [req.session.user.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

