const Router = require('koa-router');
const passport = require('koa-passport');
const fs = require('fs');
const path = require('path');

const helpers = require('../helper/helpers');
const jwt = require("../auth/jwt");
const taskService = require('../services/taskService');
const auth = require('../auth/jwt');
const authenticate = require('../auth/jwt')
    //const BASE_URL = `/api/tasks`;

const router = new Router();

router.post('/api/tasks', async(ctx) => {
    await taskService.getAllTaskForUser(ctx.request.body, ctx);
});

module.exports = router;