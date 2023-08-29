
const mysql = require('mysql');
require('dotenv').config();
const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME} = process.env;

const connection = mysql.createConnection({
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD
});

module.exports = connection;