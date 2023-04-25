const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'AlsSQL1990!',
    database: '/'
}).promise();

module.exports = connection;