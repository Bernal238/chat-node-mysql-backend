const User = require('../models/user');
const { getFilePath, unlinkFile } = require('../utils/auth');
const bycript = require('bcryptjs');
const { createAccessToken, createRefreshToken } = require('../utils/jwt');

module.exports = {
    index: (req, res) => {
        User.get(req.con, (error, rows) =>{
            if(error){
                res.status(500).send({repsonse: 'Ha ocurrido un error en el listado de los usuarios'})
            }else{
                res.status(200).send({repsonse: rows})
            }
        })
    },

    store: (req, res) => {
        req.body.img = '';
        // src/dWzJ4LYHUnSGbrCrH4-Sri5L.png
        if(req.files.img){
            req.body.img = getFilePath(req.files.img);
        }
        User.create(req.con, req.body, (error, row) => {
            if(error){
                // console.log(error);
                unlinkFile(req.body.img);
                res.status(500).send({repsonse: 'Ha ocurrido un error creando el usuario'})
            }else{
                res.status(200).send({repsonse: row})
            }
        })
    },

    login: (req, res) => {
        const { email, password } = req.body; 
        User.getByEmail(req.con, email, (error, rows) =>{
            if(error){
                console.log(error);
                res.status(500).send({ repsonse: 'Ha ocurrido un error obteniendo el usuario' });
            }else {
                const userData = rows[0];
                console.log(userData);
                bycript.compare(password, userData.password, (error, check) => {
                    // console.log("Error: ", error);
                    if(error) return res.status(500).send({ repsonse: 'Error del servidor' });
                    if(!check) return res.status(400).send({ repsonse: 'Datos incorrectos' });
                    if(!userData.active) return res.status(401).send({ repsonse: 'Usuario inactivo' });
                    delete userData.password;
                    console.log(userData);
                    res.status(200).send({
                        response: {
                            token: createAccessToken(userData),
                            refresh: createRefreshToken(userData)
                        }
                    });
                });
            }
        });
    }
}