const jwt = require('jsonwebtoken');

const userService = require('../services/userService');
const config = require('../config/config.json');

let jwtsecret = config.jwt.secret;


function checkAuthenticated(ctx, next) {
    return isAuthenticated(ctx, next);
}

function isAuthenticated(ctx, next) {
    if (typeof ctx.request.headers.authorization !== "undefined") {
        let token = ctx.request.headers.authorization.split(" ")[1];
        jwt.verify(token, jwtsecret, { algorithm: "HS256" }, (err, user) => {
            if (err) {
                ctx.status = 500;
                ctx.body = { massage: 'Not authorized' };
            }
            return next();
        });
    } else {
        ctx.status = 500;
        ctx.body = { massage: 'Not authorized' };
    }
}

module.exports = {
    checkAuthenticated,
};