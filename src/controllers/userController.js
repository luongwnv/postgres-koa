const Router = require('koa-router');
const passport = require('koa-passport');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const helpers = require('../helper/helpers');
const jwt = require("../auth/jwt");
const userService = require('../services/userService');
const auth = require('../auth/jwt');

const router = new Router();

// api register
router.post('/auth/register', async(ctx) => {
    const user = await userService.checkUser(ctx);
    if (user.length > 0) {
        ctx.body = {
            code: 0,
            massage: 'Username existed'
        };
    } else {
        await userService.addUser(ctx)
    }
});


// api login
router.post('/auth/login', async(ctx) => {
    let userBody = ctx.request.body;
    console.log('login');
    const user = await userService.checkUser(ctx);
    let isLogin = bcrypt.compareSync(userBody.password, user[0].password)
    if (isLogin) {
        console.log(user);
        ctx.body = {
            code: 1,
            userid: user[0].id,
            massage: 'Login successed',
            token: jwt.createToken({
                username: user
            })
        };
    } else {
        ctx.body = {
            code: 0,
            massage: 'Login failed',
        };
    }
});

module.exports = router;