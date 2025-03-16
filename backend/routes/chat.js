const express = require('express');
const { sendMessage, getChatHistory } = require('../controllers/chatController');
const authMiddleware = require('../middleware/auth');
const db = require('../config/db');

const router = express.Router();

router.post('/', authMiddleware, sendMessage);
router.get('/history', authMiddleware, getChatHistory);

module.exports = router;

