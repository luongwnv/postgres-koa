const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const session = require('koa-session');
const passport = require('koa-passport');
const cors = require('@koa/cors');

const store = require('./src/config/session');
const jwt = require("./src/auth/jwt");
const routes = require('./src/routes/routes')

const app = new Koa();
const PORT = process.env.PORT || 3000;

// tao sessions
app.keys = ['luong_pro123'];
app.use(session({ store }, app));

// khai bao su dung body parser
app.use(bodyParser());

// config cros cho truy cap 
app.use(cors());

// khoi tao authen session
require('./src/auth/auth');
app.use(passport.initialize());
app.use(passport.session());

// su dung guard de chan truy cap route
app.use(jwt.errorHandler()).use(jwt.jwt());

// khai bao routes
app.use(routes.userRoute);
app.use(routes.taskRoute);

// khoi tao de chay server
const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;