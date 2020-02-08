const knex = require('../config/connection');
const handlerLog = require('../log/handlerLog');
const Task = require('../models/taskModel');

// get all task for that user 
const getAllForHomePage = (userid) => {
    return knex({ u: 'users', t: 'tasks' })
        .where(
            't.userid', userid
        )
        .where(
            't.userid', knex.raw('??', ['u.id'])
        )
        .where(
            't.isdelete', false
        )
        .select(
            't.id', 't.taskname', 't.description', 't.createdate', 't.modifydate', 't.iscomplete'
        )
        .returning('*')
        .bind(console)
        .catch(err => { handlerLog.error(err) });
};

// function get all task for user
const getAllTaskForUser = (ctx) => {
    let userId = ctx.request.body.userid;
    return knex({ u: 'users', t: 'tasks' })
        .where(
            't.userid', userId
        )
        .where(
            't.userid', knex.raw('??', ['u.id'])
        )
        .where(
            't.isdelete', false
        )
        .select(
            't.id', 't.taskname', 't.description', 't.createdate', 't.modifydate', 't.iscomplete'
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
        handlerLog.error(err);
        ctx.body = {
            code: 0,
            message: err
        };
    });
}

// function insert and update task
const createTask = (ctx) => {
    let dataRequest = ctx.request.body;
    if (!dataRequest.id) {
        return knex('tasks')
            .insert({
                userid: dataRequest.userid,
                taskname: dataRequest.taskname,
                description: dataRequest.description,
                createdate: new Date().toISOString(),
                modifydate: new Date().toISOString(),
                iscomplete: dataRequest.iscomplete,
                isdelete: false
            })
            .returning('*')
            .bind(console)
            .then(results => {
                ctx.body = {
                    code: 1,
                    message: 'Add task successed'
                };
            })
            .catch(err => {
                handlerLog.error(err);
                ctx.body = {
                    code: 0,
                    message: err
                };
            });
    } else {
        return knex('tasks')
            .where('id', '=', dataRequest.id)
            .update({
                userid: dataRequest.userid,
                taskname: dataRequest.taskname,
                description: dataRequest.description,
                modifydate: new Date().toISOString(),
                iscomplete: dataRequest.iscomplete,
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
                    message: 'Update task successed'
                };
            })
            .catch(err => {
                handlerLog.error(err);
                ctx.body = {
                    code: 0,
                    message: err
                };
            });
    }
}

// function delete task by id
const deleteTaskById = (ctx) => {
    let dataRequest = ctx.request.body;
    return knex('tasks')
        .where('id', '=', dataRequest.id)
        .update({
            modifydate: new Date().toISOString(),
            iscomplete: true,
            isdelete: true
        })
        .returning('*')
        .bind(console)
        .then(results => {
            ctx.body = {
                code: 1,
                message: 'Delete task successed'
            };
        })
        .catch(err => {
            handlerLog.error(err);
            ctx.body = {
                code: 0,
                message: err
            };
        });
}

// function search task by task name for homepage
const searchTaskForHomePage = (ctx) => {
    let dataRequest = ctx.request.body;
    return knex('tasks')
        .where(
            'taskname', 'like', `%${dataRequest.taskname}%`
        )
        .where(
            'userid', dataRequest.userid
        )
        .where(
            'isdelete', false
        )
        .select(
            'id', 'taskname', 'description', 'createdate', 'modifydate', 'iscomplete'
        )
        .returning('*')
        .bind(console)
        .catch(err => { handlerLog.error(err) });
};

// search task by name
const searchTaskByName = (ctx) => {
    let dataRequest = ctx.request.body;
    return knex('tasks')
        .where(
            'taskname', 'like', `%${dataRequest.taskname}%`
        )
        .where(
            'userid', dataRequest.userid
        )
        .where(
            'isdelete', false
        )
        .select(
            'id', 'taskname', 'description', 'createdate', 'modifydate', 'iscomplete'
        )
        .returning('*')
        .bind(console)
        .then(results => {
            ctx.body = {
                code: 1,
                tasks: results,
                message: 'Search task successed'
            };
        })
        .catch(err => {
            handlerLog.error(err);
            ctx.body = {
                code: 0,
                message: err
            };
        });
}

module.exports = {
    getAllTaskForUser,
    createTask,
    deleteTaskById,
    searchTaskByName,
    getAllForHomePage,
    searchTaskForHomePage
};