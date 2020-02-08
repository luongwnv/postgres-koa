const bcrypt = require('bcryptjs');

const knex = require('../config/connection');
const handlerLog = require('../log/handlerLog');

// add username to db
const addUser = (ctx) => {
    let user = ctx.request.body;
    let hash = bcrypt.hashSync(user.password);
    return knex('users')
        .insert({
            username: user.username,
            password: hash,
            createdate: new Date().toISOString(),
            modifydate: new Date().toISOString(),
            isdelete: false
        })
        .returning('*')
        .bind(console)
        .then(results => {
            ctx.body = {
                code: 1,
                message: "Register Successed."
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

// check username login
const checkUser = (ctx) => {
    let user = ctx.request.body
    return knex({ u: 'users' })
        .where(
            'u.username', user.username
        )
        .first()
        .select('*')
        .returning('*')
        .bind(console)
        .catch(err => {
            handlerLog.error(err);
            ctx.body = {
                code: 0,
                message: err
            };
        });
}

module.exports = {
    addUser,
    checkUser
};