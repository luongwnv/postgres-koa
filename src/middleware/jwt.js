const jwt = require("koa-jwt");
const jsonwebtoken = require("jsonwebtoken");
const config = require('../config/config.json');

const jwtSecret = config.jwt.secret;
const secret = process.env.JWT_SECRET || jwtSecret;

// config serect key va unless nhung route khong can authen
const jwtInstance = jwt({ secret: secret }).unless({
    path: [
        // nhung route khong can authen
        /\/auth*/, /\/login/, /\/register/,
    ]
});

// tao token su dung jwt
module.exports.createToken = (payload) => {
    return jsonwebtoken.sign(payload, secret);
};

module.exports.jwt = () => jwtInstance;