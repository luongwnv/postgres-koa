const Router = require('koa-router');
const passport = require('koa-passport');
const fs = require('fs');
const path = require('path');

const queries = require('../queries/userQuery');
const helpers = require('../helper/helpers');
const jwt = require("../auth/jwt");

const router = new Router();
const BASE_PATH = path.join(__dirname, 'views');

router.get('/auth/register', async(ctx) => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream(path.join(BASE_PATH, 'register.html'));
});

router.post('/auth/register', async(ctx) => {
    const user = await queries.addUser(ctx.request.body);
    return passport.authenticate('local', (err, user, info, status) => {
        if (user) {
            ctx.login(user);
            ctx.redirect('/auth/status');
        } else {
            ctx.status = 400;
            ctx.body = { status: 'error' };
        }
    })(ctx);
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
    // return passport.authenticate('local', (err, user, info, status) => {
    //     if (user) {
    //         ctx.login(user);
    //         // ctx.redirect('/auth/status');
    //         ctx.body = { status: 'success' };
    //     } else {
    //         ctx.status = 400;
    //         ctx.body = { status: 'error' };
    //     }
    // })(ctx);
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;

    if (username === "luognvn1511" && password === "pass123") {
        ctx.body = {
            token: jwt.issue({
                user: "user",
                role: "admin"
            })
        }
    } else {
        ctx.status = 401;
        ctx.body = { error: "Invalid login" }
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