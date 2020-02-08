const path = require('path');
require('dotenv').config();

const config = require('./src/config/config.json');

// config connect to postgres db
let defaultConfig = config.local;
let dialect = defaultConfig.dialect;
let userDb = defaultConfig.username;
let password = defaultConfig.password;
let host = defaultConfig.host;
let port = defaultConfig.port;
let dbName = defaultConfig.database;

module.exports = {
    development: {
        client: defaultConfig.dialect,
        connection: {
            database: dbName,
            user: userDb,
            password: password,
            host: host,
            port: port
        },
        migrations: {
            directory: __dirname + '/src/migrations',
        },
        seeds: { 
            directory: __dirname + '/src/seeds'
        },
    },
    test: {
        client: defaultConfig.dialect,
        connection: {
            database: dbName,
            user: userDb,
            password: password,
            host: host,
            port: port
        },
        migrations: {
            directory: __dirname + '/src/migrations',
        },
        seeds: { 
            directory: __dirname + '/src/seeds'
        },
    }
};