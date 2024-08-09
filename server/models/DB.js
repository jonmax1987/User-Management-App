const mysql = require('mysql2/promise');
const config = require('../config');

const connection = mysql.createPool(config.db);

module.exports = connection; 
