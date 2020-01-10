const bcrypt = require('bcryptjs');
const parseTime = require('postgres-date')
const knex = require('../config/connection');

// function get het tat ca cac tast ma user do co
function getAllTaskForUser(ctx) {
    let dataRequest = ctx.request.body;
    return knex({ u: 'users', t: 'tasks' })
        .where(
            't.userid', dataRequest.userid
        )
        .where(
            't.userid', knex.raw('??', ['u.id'])
        )
        .where(
            't.isdelete', false
        )
        .select(
            't.id', 't.taskname', 't.description', 't.createdate', 't.updatedate'
        )
        .returning('*')
        .bind(console)
        .then(results => {
            ctx.body = {
                code: 1,
                tasks: results
            };
        })

    .catch(err => {
        console.log('ERROR:', err);
        ctx.body = {
            code: 0,
            massage: err
        };
    });
}

// function them va sua task
function createTask(ctx) {
    let dataRequest = ctx.request.body;
    if (!dataRequest.id) {
        console.log(parseTime(Date.now()));
        return knex('tasks')
            .insert({
                userid: dataRequest.userid,
                taskname: dataRequest.taskname,
                description: dataRequest.description,
                createdate: new Date().toISOString(),
                updatedate: new Date().toISOString(),
                isdelete: false
            })
            .returning('*')
            .bind(console)
            .then(results => {
                ctx.body = {
                    code: 1,
                    massage: 'Add task successed'
                };
            })
            .catch(err => {
                console.log('ERROR:', err);
                ctx.body = {
                    code: 0,
                    massage: err
                };
            });
    } else {
        return knex('tasks')
            .where('id', '=', dataRequest.id)
            .update({
                userid: dataRequest.userid,
                taskname: dataRequest.taskname,
                description: dataRequest.description,
                updatedate: new Date().toISOString(),
                isdelete: false
            })
            .decrement({
                balance: 50,
            })
            .clearCounters()
            .returning('*')
            .bind(console)
            .then(results => {
                ctx.body = {
                    code: 1,
                    massage: 'Update task successed'
                };
            })
            .catch(err => {
                console.log('ERROR:', err);
                ctx.body = {
                    code: 0,
                    massage: err
                };
            });
    }
}

// function xoa task theo id
function deleteTaskById(ctx) {
    let dataRequest = ctx.request.body;
    return knex('tasks')
        .where('id', '=', dataRequest.id)
        .update({
            updatedate: new Date().toISOString(),
            isdelete: true
        })
        .returning('*')
        .bind(console)
        .then(results => {
            ctx.body = {
                code: 1,
                massage: 'Delete task successed'
            };
        })
        .catch(err => {
            console.log('ERROR:', err);
            ctx.body = {
                code: 0,
                massage: err
            };
        });
}

module.exports = {
    getAllTaskForUser,
    createTask,
    deleteTaskById
};