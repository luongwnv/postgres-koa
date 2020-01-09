const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const passport = require('koa-passport');

const userRoutes = require('./src/routes/userRoute');
const taskRoutes = require('./src/routes/taskRoute');
const store = require('./src/config/session');

const app = new Koa();
const PORT = process.env.PORT || 3000;

const Router = require('koa-router');
const router = new Router();
const securedRouter = new Router();

const jwt = require("./src/auth/jwt");

// tao sessions
app.keys = ['luong_pro123'];
app.use(session({ store }, app));

// khai bao su dung body parser
app.use(bodyParser());

// su dung guard de chan truy cap route
app.use(jwt.errorHandler()).use(jwt.jwt());

// khai bao routes
app.use(userRoutes.routes());
app.use(taskRoutes.routes());

// khoi tao de chay server
const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;