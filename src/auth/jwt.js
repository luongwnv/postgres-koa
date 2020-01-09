const jwt = require("koa-jwt");
const jsonwebtoken = require("jsonwebtoken");
const config = require('../config/config.json');

let jwtsecret = config.jwt.secret;

const jwtInstance = jwt({ secret: jwtsecret }).unless({
    path: [
        // nhung route khong can authen
        '/auth'
    ]
});

function authenticate(ctx, next) {
    ctx.body = { message: 'abc' };
};

function JWTErrorHandler(ctx, next) {
    return next().catch((err) => {
        if (401 == err.status) {
            ctx.status = 401;
            ctx.body = {
                "error": "Not authorized"
            };
        } else {
            throw err;
        }
    });
};

// tao token su dung jwt
module.exports.createToken = (payload) => {
    return jsonwebtoken.sign(payload, jwtsecret);
};

module.exports.jwt = () => jwtInstance;
module.exports.authenticate = () => authenticate;
module.exports.errorHandler = () => JWTErrorHandler;