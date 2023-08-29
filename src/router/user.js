const express = require('express');
const multiparty = require('connect-multiparty')
const userController = require('../controllers/user');

const mdUserImg = multiparty({uploadDir: 'src/uploads/users'})
const app = express.Router();

app.get('/users', userController.index);
app.post('/users/create', mdUserImg, userController.store);
app.post('/users/login', mdUserImg, userController.login);
module.exports = app;