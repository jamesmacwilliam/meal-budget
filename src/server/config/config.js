const _ = require('lodash');
const db = require('./database.json');

const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

let env_specific = {
  development: {
    port: 3000,
    assets: {
      host: 'localhost',
      port: 8080
    }
  },
  test: {
    port: 3001
  }
};

let universal = {
  passport: {
    secret: process.env.PASSPORT_SECRET
  },
  database: _.merge(db[env], {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  })
}
module.exports = _.merge(env_specific[env], universal);
