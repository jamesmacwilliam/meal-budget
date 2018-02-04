const config = require('../config/config.js');

module.exports = require('knex')(config.database);
