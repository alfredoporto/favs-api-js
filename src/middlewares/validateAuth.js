const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config');
const Boom = require('@hapi/boom');

module.exports = (req, res, next) => {
    try {
        //console.log("auth middleware")
        const token = req.headers['authorization']
            ? req.headers['authorization'].replace('Bearer ', '')
            : undefined;
        //console.log(token);
        const decodedToken = jwt.verify(token, jwtSecret);
        req.userData = decodedToken;
        //console.log(req.userData)
        next();
    } catch (error) {
        console.log(error)
        res.send(Boom.forbidden(`Unauthorized`));
    }
};