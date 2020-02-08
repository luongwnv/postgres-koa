exports.seed = function (knex) {
    // Deletes all existing entries
    return knex('tasks').del()
        .then(function () {
            // Inserts seed entries
            return knex('tasks').insert([
                {
                    id: 1,
                    userid: 1,
                    taskname: 'luong learning node',
                    description: 'node so perfect',
                    createdate: new Date().toISOString(),
                    modifydate: new Date().toISOString(),
                    iscomplete: false,
                    isdelete: false
                },
                {
                    id: 2,
                    userid: 1,
                    taskname: 'luong learning koa',
                    description: 'koa so perfect',
                    createdate: new Date().toISOString(),
                    modifydate: new Date().toISOString(),
                    iscomplete: false,
                    isdelete: false
                },
                {
                    id: 3,
                    userid: 1,
                    taskname: 'luong learning postgres',
                    description: 'postgres so perfect',
                    createdate: new Date().toISOString(),
                    modifydate: new Date().toISOString(),
                    iscomplete: false,
                    isdelete: false
                },
            ]);
        });
};