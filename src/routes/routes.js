const Router = require('koa-router');
const userRoutes = require('../controllers/userController');
const taskRoutes = require('../controllers/taskController');

// khai bao routes
let userRoute = userRoutes.routes();
let taskRoute = taskRoutes.routes();

module.exports = {
    userRoute,
    taskRoute
};