const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// User authentication routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);

module.exports = router;
