const express = require('express');
const router = express.Router();
const { register, login, logout, validateToken } = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middleware/validators');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/logout', logout);
router.get('/protected-route',authenticateToken, validateToken);

module.exports = router;
