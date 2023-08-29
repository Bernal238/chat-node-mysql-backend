const bcrypt = require('bcryptjs');
const fs = require('fs');

function hashPassword(password){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

function getFilePath(file){
    const path = file.path.split('\\');
    const fileName = path.pop();
    const folder = path.pop();
    return `${folder}/${fileName}`;
}

function unlinkFile(path){
    try{
        if(!path) throw new Error('No hay imagen para eliminar');
        fs.unlinkSync(`src/uploads/${path}`);
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    hashPassword,
    getFilePath,
    unlinkFile
}