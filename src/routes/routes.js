const Router = require('koa-router');
const userRoutes = require('../controllers/userController');
const taskRoutes = require('../controllers/taskController');
const viewRoutes = require('../controllers/viewController');

// khai bao routes
let userRoute = userRoutes.routes();
let taskRoute = taskRoutes.routes();
let viewRoute = viewRoutes.routes();

// middleware auto redirect not found page
async function defaultRoute(ctx, next) {
    try {
        await next()
        const status = ctx.status || 404;
        if (status === 404) {
            ctx.throw(404);
        }
    } catch (err) {
        ctx.status = err.status || 500;
        await ctx.render('404', {});
    }
}

module.exports = {
    userRoute,
    taskRoute,
    viewRoute,
    defaultRoute
};