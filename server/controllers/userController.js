const bcrypt = require('bcrypt');
const con = require('../models/DB');
const { generateToken } = require('../middleware/authMiddleware');
const ApiResponse = require('../models/ApiResponse');

exports.register = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    try {
        const [existingUser] = await con.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json(new ApiResponse('fail', 'Validation failed', null, [
                { type: 'field', value: email, msg: 'Email already exists', path: 'email', location: 'body' }
            ]));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)';
        await con.query(query, [firstname, lastname, email, hashedPassword]);

        res.status(201).json(new ApiResponse('success', 'User registered successfully'));
    } catch (err) {
        console.error('Error inserting user:', err);
        res.status(500).json(new ApiResponse('error', 'Database error'));
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await con.query('SELECT id, password FROM users WHERE email = ?', [email]);
        const user = rows[0];
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json(new ApiResponse('fail', 'Invalid credentials'));
        }

        const token = generateToken(user);
        res.cookie('token', token, { httpOnly: true }).json(new ApiResponse('success', 'Logged in successfully'));
    } catch (err) {
        console.error('Error logging user:', err);
        res.status(500).json(new ApiResponse('error', 'Database error'));
    }
};

exports.logout = (req, res) => {    
    res.clearCookie('token').json(new ApiResponse('success', 'Logged out successfully'));
};

exports.validateToken = (req, res) => {
    res.status(200).json(new ApiResponse('success', 'Token is valid'));
};

exports.getAllUsers = async (req, res) => {
    try {
        const [users] = await con.query('SELECT id, firstname, lastname, email FROM users');
        res.json(new ApiResponse('success', 'Users fetched successfully', users));
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json(new ApiResponse('error', 'Database error'));
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, email } = req.body;

    try {
        const query = 'UPDATE users SET firstname = ?, lastname = ?, email = ? WHERE id = ?';
        await con.query(query, [firstname, lastname, email, id]);
        res.json(new ApiResponse('success', 'User updated successfully'));
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json(new ApiResponse('error', 'Database error'));
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await con.query('DELETE FROM users WHERE id = ?', [id]);
        res.json(new ApiResponse('success', 'User deleted successfully'));
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json(new ApiResponse('error', 'Database error'));
    }
};
