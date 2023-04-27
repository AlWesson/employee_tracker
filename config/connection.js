require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: 'employee_tracker'
}).promise();

module.exports = connection;