const bcrypt = require('bcryptjs');
const knex = require('../config/connection');

// function getSingleUser(id) {
//     return knex('users')
//         .select('*')
//         .where({ id: parseInt(id) });
// }
// add usernam vao db
function addUser(ctx) {
    let user = ctx.request.body
    let hash = bcrypt.hashSync(user.password);
    return knex('users')
        .insert({
            username: user.username,
            password: hash,
            createdate: new Date().toISOString(),
            updatedate: new Date().toISOString(),
            isdelete: false
        })
        .returning('*')
        .bind(console)
        .then(results => {
            ctx.body = {
                code: 1,
                massage: "Register Successed"
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

// login
function checkUser(ctx) {
    let user = ctx.request.body
    return knex({ u: 'users' })
        .where(
            'u.username', user.username
        )
        .select('*')
        .returning('*')
        .bind(console)
        .catch(err => {
            console.log('ERROR:', err);
            ctx.body = {
                code: 0,
                massage: err
            };
        });
}

module.exports = {
    addUser,
    checkUser
};