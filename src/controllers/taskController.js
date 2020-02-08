const Router = require('koa-router');

const taskService = require('../services/taskService');
const auth = require("../middleware/authenticated");
const jwt = require("../middleware/jwt");
const authenticated = auth.authentication();

const BASE_URL = `/api`;

const router = new Router();

router.post(`${BASE_URL}/task`, authenticated, doGetAllTask);
router.post(`${BASE_URL}/update-task`, authenticated, doUpdateTask);
router.post(`${BASE_URL}/delete-task`, authenticated, doDeleteTask);
router.post(`${BASE_URL}/search-task`, authenticated, doSearchTask);

// api get all task for user
async function doGetAllTask(ctx) {
    await taskService.getAllTaskForUser(ctx);
}

// api insert and update task
async function doUpdateTask(ctx) {
    await taskService.createTask(ctx);
}

// api delete task by id
async function doDeleteTask(ctx) {
    await taskService.deleteTaskById(ctx);
}

// api search task by task name
async function doSearchTask(ctx) {
    await taskService.searchTaskByName(ctx);
}

module.exports = router;