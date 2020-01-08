const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const passport = require('koa-passport');

const userRoutes = require('./src/routes/userRoute');
const taskRoutes = require('./src/routes/taskRoute');
const authRoutes = require('./src/routes/authRoute');
const store = require('./src/config/session');

const app = new Koa();
const PORT = process.env.PORT || 3000;

const Router = require('koa-router');
const router = new Router();
const securedRouter = new Router();

const jwt = require("./src/auth/jwt");
// app.use(jwt.errorHandler()).use(jwt.jwt());

// tao sessions
app.keys = ['luong_pro123'];
app.use(session({ store }, app));

// khai bao su dung body parser
app.use(bodyParser());

// khoi tao authen
require('./src/auth/auth');
app.use(passport.initialize());
app.use(passport.session());

// khoi tao secure route
// app.use(authRoutes.routes()).use(router.allowedMethods());
// app.use(securedRouter.routes()).use(securedRouter.allowedMethods());

// khai bao routes
app.use(userRoutes.routes());
app.use(taskRoutes.routes());
app.use(authRoutes.routes());

router.get('/a', async(ctx) => {
    ctx.body = {
        status: 'success',
        message: 'hello, world!'
    };
})

// khoi tao server
const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;