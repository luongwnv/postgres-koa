const Router = require('koa-router');
const passport = require('koa-passport');

const taskService = require('../services/taskService');
const userService = require('../services/userService');
const getValueCookie = require("../utilities/getValueCookie");

const router = new Router();

router.get('/register', loadRegister);
router.post('/register', doRegister);
router.get('/login', loadLogin);
router.post('/login', doLogin);
router.get('/logout', loadLogout);
router.get('/', getAllTask);
router.post('/update', doUpdateTask);
router.post('/delete', doDeleteTask);
router.post('/search', doSearchTask);

// load register page
async function loadRegister(ctx) {
    let messageError = null;
    await ctx.render('register', { messageError });
}

// do register
async function doRegister(ctx) {
    let messageError = null;
    if (ctx.request.body.username === '' && ctx.request.body.password === '') {
        messageError = 'Username and password is required.';
        await ctx.render('login', { messageError });
        return;
    }
    if (ctx.request.body.username === '') {
        messageError = 'Username is required.';
        await ctx.render('login', { messageError });
        return;
    }
    if (ctx.request.body.password === '') {
        messageError = 'Password is required.';
        await ctx.render('login', { messageError });
        return;
    }
    const user = await userService.checkUser(ctx);
    if (user) {
        let messageError = 'Username is existed, please using username to login.';
        await ctx.render('login', { messageError });
    } else {
        await userService.addUser(ctx);
        return passport.authenticate('local', (err, user, info, status) => {
            if (user) {
                ctx.login(user);
                ctx.cookies.set('userid', ctx.session.passport.user);
                ctx.redirect('/');
            } else {
                ctx.status = 400;
                ctx.body = { status: 'error' };
            }
        })(ctx);
    }
}

// load login page
async function loadLogin(ctx) {
    let messageError = null;
    await ctx.render('login', { messageError });
}

// do login 
async function doLogin(ctx) {
    let messageError = null;
    if (ctx.request.body.username === '' && ctx.request.body.password === '') {
        messageError = 'Username and password is required.';
        await ctx.render('login', { messageError });
        return;
    }
    if (ctx.request.body.username === '') {
        messageError = 'Username is required.';
        await ctx.render('login', { messageError });
        return;
    }
    if (ctx.request.body.password === '') {
        messageError = 'Password is required.';
        await ctx.render('login', { messageError });
        return;
    }
    return passport.authenticate('local', async (err, user, info, status) => {
        if (user) {
            ctx.login(user);
            ctx.cookies.set('userid', ctx.session.passport.user);
            ctx.redirect('/');
        } else {
            ctx.status = 400;
            messageError = err;
            await ctx.render('login', { messageError });
        }
    })(ctx);
}

// load logout
async function loadLogout(ctx) {
    let messageError = null;
    if (ctx.isAuthenticated()) {
        ctx.logout();
        ctx.redirect('/login', { messageError });
    } else {
        ctx.body = { success: false };
        ctx.throw(401);
    }
}

// get all task 
async function getAllTask(ctx) {
    if (ctx.isAuthenticated()) {
        // get userId in cookie
        let userId = ctx.session.passport.user;
        let listTaskOfUser = [];
        await getTaskForHome(userId).then(rs => {
            listTaskOfUser = [...rs];
        });
        await ctx.render('home', { listTaskOfUser });
    } else {
        ctx.redirect('/login');
    }
}

// do update task (above update and insert new task)
async function doUpdateTask(ctx) {
    if (ctx.isAuthenticated()) {
        let userId = ctx.session.passport.user;
        // valdation taskname
        if (ctx.request.body.taskname === '') {
            // do 
        }
        if (!ctx.request.body.iscomplete) {
            ctx.request.body.iscomplete = false;
        }
        ctx.request.body.userid = userId;
        await taskService.createTask(ctx);
        ctx.redirect('/');
    }
}

// do delete task by id
async function doDeleteTask(ctx) {
    if (ctx.isAuthenticated()) {
        await taskService.deleteTaskById(ctx);
        ctx.redirect('/');
    }
}

// do search task by name
async function doSearchTask(ctx) {
    if (ctx.isAuthenticated()) {
        let userId = ctx.session.passport.user;
        ctx.request.body.userid = userId;
        let listTaskOfUser = [];
        await getTaskForSearch(ctx).then(rs => {
            listTaskOfUser = [...rs];
        });
        await ctx.render('home', { listTaskOfUser });
    }
}

// get all task for user
function getTaskForHome(id) {
    return taskService.getAllForHomePage(id);
}

// get all task for user
async function getTaskForSearch(ctx) {
    return await taskService.searchTaskForHomePage(ctx);
}

module.exports = router;