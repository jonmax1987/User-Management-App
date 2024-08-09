const express = require('express');
const router = express.Router();
const { register, login, logout, getAllUsers, updateUser, deleteUser, validateToken } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { validateRegister, validateLogin, validateUpdateUser } = require('../middleware/validators');
const ApiResponse = require('../models/ApiResponse');


router.post('/register',validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/logout', logout);
router.get('/', authenticateToken, getAllUsers);
router.put('/:id', authenticateToken, validateUpdateUser, updateUser);
router.delete('/:id', authenticateToken, deleteUser);
router.get('/protected-route', authenticateToken, validateToken);

module.exports = router;
