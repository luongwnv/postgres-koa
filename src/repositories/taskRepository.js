const knex = require('../config/connection');
const handlerLog = require('../log/handlerLog');

// validate task before save
const validateTask = (task) => {
    if (!(task.userId && task.taskName)) {
        throw new Error('userID and name of task is required.');
    }
}

// get all tasks
const getAll = () => {
    return knex({ t: 'tasks' })
        .select(
            't.id', 't.taskname', 't.description', 't.createdate', 't.modifydate', 't.iscomplete'
        )
        .returning('*')
        .bind(console)
        .catch(err => { handlerLog.error(err) });
}

// get all task for user by id
const getAllTaskForUser = (userId) => {
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
        .catch(err => { handlerLog.error(err) });
}

// save a new task
const createTask = (userId, id, taskName, description, isComplete) => {
    if (id) {
        return knex('tasks')
            .insert({
                userid: userId,
                taskname: taskName,
                description: description,
                createdate: new Date().toISOString(),
                modifydate: new Date().toISOString(),
                iscomplete: isComplete,
                isdelete: false
            })
            .returning('*')
            .bind(console)
            .catch(err => {
                handlerLog.error(err);
                throw new Error(err);
            });
    } else {
        return knex('tasks')
            .where('id', '=', id)
            .update({
                userid: userId,
                taskname: taskName,
                description: description,
                createdate: new Date().toISOString(),
                modifydate: new Date().toISOString(),
                iscomplete: isComplete,
                isdelete: false
            })
            .decrement({
                balance: 50,
            })
            .clearCounters()
            .returning('*')
            .bind(console)
            .catch(err => {
                handlerLog.error(err);
                throw new Error(err);
            });
    }
}

// save a new employee
const save = (task) => {
    validateTask(task);
    createTask(task.userId, task.taskName, task.description, task.isComplete);
    return {
        message: `Save task successed.`
    }
}


// delete employee by id
const deleteById = (taskId) => {
    knex('tasks')
        .where('id', '=', taskId)
        .update({
            modifydate: new Date().toISOString(),
            iscomplete: true,
            isdelete: true
        })
        .returning('*')
        .bind(console)
        .catch(err => {
            handlerLog.error(err);
            return {
                message: `Delete error: ${err}`
            }
            throw new Error(err);
        });
    return { message: `Delete taskId = ${taskId} successed.` };
}

module.exports = {
    getAll,
    getAllTaskForUser,
    save,
    deleteById,
};