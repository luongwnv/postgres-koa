const jwt = require('jsonwebtoken');

const config = require('../config/config.json');
const getValueCookie = require("../utilities/getValueCookie");

const jwtSecret = config.jwt.secret;
const secret = process.env.JWT_SECRET || jwtSecret;

// function authentication and return error if not login yet
const authentication = async(ctx, next) => {
    if (!ctx.headers.authorization) {
        ctx.status = 401;
        ctx.body = {
            "error": "Not authorized."
        };
        return;
    }
    const token = ctx.headers.authorization.split(' ')[1];
    try {
        ctx.request.jwtPayload = jwt.verify(token, secret);
    } catch (err) {
        ctx.throw(err.status || 403, err.text);
    }
    await next();
};

module.exports.authentication = () => authentication;