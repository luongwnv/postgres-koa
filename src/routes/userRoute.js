const Router = require('koa-router');
const router = new Router();

const BASE_URL = `/api/user`;

router.get(BASE_URL, async(ctx) => {
    ctx.body = {
        status: 'success',
        message: 'hello, world!'
    };
})

module.exports = router;