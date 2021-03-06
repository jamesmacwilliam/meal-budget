require('babel-register')

const path = require('path')
const config = require('./src/server/config/config')

const BASE_PATH = path.join(__dirname, 'src', 'server', 'db');

module.exports = {
  client: 'pg',
  connection: config.database,
  migrations: {
    directory: path.join(BASE_PATH, 'migrations')
  },
  seeds: {
    directory: path.join(BASE_PATH, 'seeds')
  }
}
