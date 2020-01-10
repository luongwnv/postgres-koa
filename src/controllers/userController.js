const Router = require('koa-router');
const passport = require('koa-passport');
const fs = require('fs');
const path = require('path');

const helpers = require('../helper/helpers');
const jwt = require("../auth/jwt");
const userService = require('../services/userService');
const auth = require('../auth/jwt');

const router = new Router();
const BASE_PATH = path.join(__dirname, 'views');

router.get('/auth/register', async(ctx) => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream(path.join(BASE_PATH, 'register.html'));
});

router.post('/auth/register', async(ctx) => {
    const user = await userService.addUser(ctx.request.body, ctx);
});

router.get('/auth/login', async(ctx, next) => {
    if (!helpers.checkAuthenticated(ctx, next)) {
        ctx.type = 'html';
        ctx.body = fs.createReadStream(path.join(BASE_PATH, 'login.html'));
    } else {
        ctx.redirect('/auth/status');
    }
});

router.post('/auth/login', async(ctx) => {
    console.log('login');
    const user = await userService.checkUser(ctx.request.body, ctx);
    if (user.length > 0) {
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

router.get('/auth/logout', async(ctx, next) => {
    if (helpers.checkAuthenticated(ctx, next)) {
        ctx.logout();
        ctx.redirect('/auth/login');
    } else {
        ctx.body = { success: false };
        ctx.throw(401);
    }
});

router.get('/auth/home', async(ctx, next) => {
    if (helpers.checkAuthenticated(ctx, next)) {
        ctx.type = 'html';
        ctx.body = fs.createReadStream(path.join(BASE_PATH, 'home.html'));
    } else {
        ctx.redirect('/auth/login');
    }
});

module.exports = router;