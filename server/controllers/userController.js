const con = require('../config/DB');
const ApiResponse = require('../utils/ApiResponse');


exports.createUser = async (req, res) => {
    const { firstname, lastname, email } = req.body;

    try {
        const [existingUser] = await con.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json(new ApiResponse('fail', 'Validation failed', null, [
                { type: 'field', value: email, msg: 'Email already exists', path: 'email', location: 'body' }
            ]));
        }

        const query = 'INSERT INTO users (firstname, lastname, email) VALUES (?, ?, ?)';
        await con.query(query, [firstname, lastname, email]);

        res.status(201).json(new ApiResponse('success', 'User created successfully'));
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json(new ApiResponse('error', 'Database error'));
    }
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
