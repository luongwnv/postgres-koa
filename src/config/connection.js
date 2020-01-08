const environment = process.env.NODE_ENV || 'dev';
const config = require('./knex.js')[environment];

module.exports = require('knex')(config);