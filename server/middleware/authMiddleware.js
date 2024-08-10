const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const ApiResponse = require('../utils/ApiResponse');
const jwtSecret = process.env.JWT_SECRET; 

// Function to generate a JWT token
function generateToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '1h' });
}

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
    const token = req?.cookies?.token || '';
    
    if (!token) {
        return res.status(403).json(new ApiResponse('fail', 'No token provided'));
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json(new ApiResponse('fail', 'Invalid token'));
    }
}

module.exports = {
    generateToken,
    authenticateToken
};
