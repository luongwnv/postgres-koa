const Sequelize = require('sequelize');
const config = require('./config.json');

// khai bao config connect toi postgres
let defaultConfig = config.local;
let userdb = defaultConfig.username;
let password = defaultConfig.password;
let host = defaultConfig.host;
let port = defaultConfig.port;
let dbName = defaultConfig.database;

// url posgres connect
DATABASE_URL = `postgres://${userdb}:${password}@${host}:${port}/${dbName}`;
const database = new Sequelize(DATABASE_URL);

module.exports = database;