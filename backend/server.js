const express = require('express');
const cors = require('cors');
const session = require('express-session');
const logger = require('./middleware/logger');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true
}));

app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));

