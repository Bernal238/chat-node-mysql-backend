const express = require('express');
const messageController = require('../controllers/message');
const { userAuthenticated } = require('../middleware/auth');

const app = express.Router();

app.get('/messages', userAuthenticated,  messageController.index);
app.post('/messages/create', userAuthenticated, messageController.store);
app.delete('/messages/:id', userAuthenticated, messageController.destroy);

module.exports = app;