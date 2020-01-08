const path = require('path');

const config = require('./config.json');

// khai bao config connect toi postgres
let defaultConfig = config.local;
let userdb = defaultConfig.username;
let password = defaultConfig.password;
let host = defaultConfig.host;
let port = defaultConfig.port;
let dbName = defaultConfig.database;

module.exports = {
    dev: {
        client: 'pg',
        connection: `postgres://${userdb}:${password}@${host}:${port}/${dbName}`,
    }
};