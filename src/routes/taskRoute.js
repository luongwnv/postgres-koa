const Router = require('koa-router');
//const queries = require('../db/queries/movies');

const router = new Router();
const BASE_URL = `/api/tasks`;

router.get(BASE_URL, async(ctx) => {
    // try {
    //     const movies = await queries.getAllMovies();
    //     ctx.body = {
    //         status: 'success',
    //         data: movies
    //     };
    // } catch (err) {
    //     console.log(err)
    // }
})

module.exports = router;