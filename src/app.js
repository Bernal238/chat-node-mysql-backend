const express = require('express');
const cors = require('cors');
const dbConnection = require('./config/db');

const { API_VERSION, API_NAME } = process.env;

const app = express();

const http = require('http');
const httpServer = http.createServer(app);

const io = require('socket.io')(httpServer,{
    cors: {
        origin: 'http://localhost:4200'
    }
}) 

//IMPORTAR RUTAS
const userRoutes = require('./router/user');
const messageRoutes = require('./router/message');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('src/uploads'));
app.use(cors());

app.use((req, res, next) => {
    req.io = io;
    req.con = dbConnection;
    next();
})

//EXPONER RUTAS
const basePath = `/${API_NAME}/${API_VERSION}`;
app.use(basePath, userRoutes);
app.use(basePath, messageRoutes);
app.get('/', (req, res) => {
    res.status(200).send('Ok');
})


io.on('connect', (socket) => {
    socket.on('disconnect', () => {
        console.log('Usuario no encontrado');
    })
});

module.exports = httpServer;