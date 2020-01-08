const Sequelize = require('sequelize');
const { Client } = require('pg');
const database = require('../config/database');

const config = require('../config/config.json');

// khai bao config connect toi postgres
let defaultConfig = config.local;
let userdb = defaultConfig.username;
let password = defaultConfig.password;
let host = defaultConfig.host;
let port = defaultConfig.port;
let dbName = defaultConfig.database;

// url posgres connect
DATABASE_URL = `postgres://${userdb}:${password}@${host}:${port}/${dbName}`;
const client = new Client({
    connectionString: DATABASE_URL
});

client.connect();

// const User = database.define(
//     'users', {
//         nickname: {
//             type: Sequelize.TEXT
//         }
//     }, { timestamps: false }
// );

// User.readAll = async(req, res) => {
//     try {
//         const users = await User.findAll();
//         return res.send({ users });
//     } catch (error) {
//         return res.send(error);
//     }
// };

exports.getUser = function(ctx) {
    let sqlq = `SELECT * 
                FROM Users;`;
    client.connect(function(err) {
        if (err) {}
        client.query(sqlq, function(err, result) {
            if (err) {
                console.log(err);
                ctx.body = { massage: err };
            }
            return result.rows[0];
        });
    });
};