const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }
    const token = authHeader.split(' ')[1] //TODO Bearer <Token>
    if (!token || token === '') {
        req.isAuth = false;
        return next();
    }
    let decodedToken;
    try {
        decodedToken = await jwt.verify(token, config.get('jwtSecret'));
    } catch (e) {
        console.log(e);
        req.isAuth = false;
        return next();
    }
    if (!decodedToken) {
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.userID = decodedToken.userID;
    next();
};