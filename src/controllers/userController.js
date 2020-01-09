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

router.get('/auth/login', async(ctx) => {
    if (!helpers.ensureAuthenticated(ctx)) {
        ctx.type = 'html';
        ctx.body = fs.createReadStream(path.join(BASE_PATH, 'login.html'));
    } else {
        ctx.redirect('/auth/status');
    }
});

router.post('/auth/login', async(ctx) => {
    const user = await userService.checkUser(ctx.request.body, ctx);
    if (user) {
        console.log(user);
        ctx.body = {
            code: 1,
            massage: 'Login successed',
            token: jwt.createToken({
                username: user
            })
        };
    }
});

router.get('/auth/logout', async(ctx) => {
    if (helpers.ensureAuthenticated(ctx)) {
        ctx.logout();
        ctx.redirect('/auth/login');
    } else {
        ctx.body = { success: false };
        ctx.throw(401);
    }
});

router.get('/auth/status', async(ctx) => {
    if (helpers.ensureAuthenticated(ctx)) {
        ctx.type = 'html';
        ctx.body = fs.createReadStream(path.join(BASE_PATH, 'status.html'));
    } else {
        ctx.redirect('/auth/login');
    }
});

router.get('/auth/admin', async(ctx) => {
    if (await helpers.ensureAdmin(ctx)) {
        ctx.type = 'html';
        ctx.body = fs.createReadStream(path.join(BASE_PATH, 'admin.html'));
    } else {
        ctx.redirect('/auth/login');
    }
});

module.exports = router;