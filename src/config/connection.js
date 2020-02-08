const knex = require('knex');
const { Model } = require("objection");

const environment = process.env.NODE_ENV || 'development';
const config = require('../../knexfile.js')[environment];

// conneect to db with Model
function connect() {
    const knex = Knex(config);
    Model.knex(knex);
    return knex;
}

module.exports = knex(config);