const Router = require('koa-router');
const passport = require('koa-passport');
const fs = require('fs');
const path = require('path');

const helpers = require('../helper/helpers');
const jwt = require("../auth/jwt");
const taskService = require('../services/taskService');
const auth = require('../auth/jwt');
const authenticate = require('../auth/jwt')

const BASE_URL = `/api`;

const router = new Router();

// get all tat ca cac task
router.post(BASE_URL + '/tasks', async(ctx) => {
    await taskService.getAllTaskForUser(ctx);
});

// them va sua task
router.post(BASE_URL + '/add-task', async(ctx) => {
    await taskService.createTask(ctx);
});

// xoa 1 task theo id
router.post(BASE_URL + '/delete-task', async(ctx) => {
    await taskService.deleteTaskById(ctx);
});


module.exports = router;