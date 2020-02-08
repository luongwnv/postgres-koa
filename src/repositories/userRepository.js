const knex = require('../config/connection');
const handlerLog = require('../log/handlerLog');

// get all user
const getAllUser = () => {
    return knex({ u: 'users' })
        .select(
            'u.id', 'u.username', 'u.password', 'u.createdate', 'u.modifydate', 'u.isdelete'
        )
        .returning('*')
        .bind(console)
        .catch(err => { handlerLog.error(err) });
}

module.exports = {
    getAllUser
};