const jwt = require("koa-jwt");
const jsonwebtoken = require("jsonwebtoken");
const SECRET = "luong_pro123";
const jwtInstance = jwt({ secret: SECRET });

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

// helper function
module.exports.issue = (payload) => {
    return jsonwebtoken.sign(payload, SECRET);
};

module.exports.jwt = () => jwtInstance;
module.exports.errorHandler = () => JWTErrorHandler;