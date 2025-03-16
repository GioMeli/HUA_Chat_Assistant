const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",      // Change if you have a different user
    password: "123Gm456!",      // Change if you set a password
    database: "hua_chat_db"
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("✅ Connected to MySQL Database");
    }
});

module.exports = db;
