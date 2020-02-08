const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const session = require('koa-session');
const cors = require('koa-cors');
const render = require('koa-ejs');
const path = require('path');
const serve = require('koa-static');
const passport = require('koa-passport');
const graphqlHTTP = require('koa-graphql');
const mount = require('koa-mount');

const store = require('./src/config/session');
const jwt = require("./src/middleware/jwt");
const authenticated = require("./src/middleware/authenticated");
const routes = require('./src/routes/routes')
const handlerLog = require('./src/log/handlerLog');
const graphqlController = require('./src/controllers/graphqlController');

const app = new Koa();
const PORT = process.env.PORT || 3000;

// init sessions
app.keys = ['luong_pro123'];
app.use(session({ store }, app));
require('./src/middleware/authByKoaSession');
app.use(passport.initialize());
app.use(passport.session());

// define body parser
app.use(bodyParser());

// config cros for domain
app.use(cors());

// init routes
app.use(routes.userRoute);
app.use(routes.taskRoute);
app.use(routes.viewRoute);
app.use(routes.defaultRoute);

// setup for view render
render(app, {
    root: path.join(__dirname, '/src/views'),
    layout: 'index',
    viewExt: 'html',
    cache: false,
    debug: false
});

// public js folder for FE
app.use(serve(__dirname, 'public'));

// start graphql
app.use(mount('/graphql', graphqlController));

// init server
const server = app.listen(PORT, () => {
    handlerLog.info(`Server listening on port: ${PORT}`);
});

module.exports = server;