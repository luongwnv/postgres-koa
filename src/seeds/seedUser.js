exports.seed = function (knex) {
    // Deletes all existing entries
    return knex('users').del()
        .then(function () {
            // Inserts seed entries
            return knex('users').insert([
                {
                    id: 1,
                    username: 'luongnv',
                    password: '$2a$10$pYVPbnDPXiGFZ/qOC29m9.7MSVUFe74EDroiV5Q.Zqq9M2xIeyfhG',
                    createdate: new Date().toISOString(),
                    modifydate: new Date().toISOString(),
                    isdelete: false
                },
                {
                    id: 2,
                    username: 'lyly',
                    password: '$2a$10$pYVPbnDPXiGFZ/qOC29m9.7MSVUFe74EDroiV5Q.Zqq9M2xIeyfhG',
                    createdate: new Date().toISOString(),
                    modifydate: new Date().toISOString(),
                    isdelete: false
                },
                {
                    id: 3,
                    username: 'liang',
                    password: '$2a$10$pYVPbnDPXiGFZ/qOC29m9.7MSVUFe74EDroiV5Q.Zqq9M2xIeyfhG',
                    createdate: new Date().toISOString(),
                    modifydate: new Date().toISOString(),
                    isdelete: false
                },
            ]);
        });
};