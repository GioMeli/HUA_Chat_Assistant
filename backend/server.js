const express = require('express');
const cors = require('cors');
const session = require('express-session');
const logger = require('./middleware/logger');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const db = require('../config/db'); // Ensure database connection

dotenv.config();

const app = express();

// Enable CORS with credentials (important for sessions)
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json());
app.use(logger);

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true }
}));

// Routes
app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
