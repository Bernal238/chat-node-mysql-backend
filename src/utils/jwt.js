const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;

function createAccessToken(user){
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 5);
    return jwt.sign(_tokenPayload(user, expiration), JWT_SECRET_KEY);
}

function createRefreshToken(user){
    const expiration = new Date();
    expiration.setMonth(expiration.getMonth() + 1);
    return jwt.sign(_tokenPayload(user, expiration), JWT_SECRET_KEY);
}

function decodeToken(token){
    return jwt.decode(token, JWT_SECRET_KEY);
}

function _tokenPayload(user, expiration, tokenType = 'token'){
    return{
        tokenType,
        user,
        iat: new Date().getTime(),
        exp: expiration.getTime()
    }
}

module.exports = {
    createAccessToken,
    createRefreshToken, 
    decodeToken
}