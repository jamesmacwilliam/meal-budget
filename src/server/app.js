const fs = require('fs');
const Koa = require('koa');
const app = new Koa();

// load environment variables
require('dotenv').load();

// session
const session = require('koa-session');
const RedisStore = require('koa-redis');
app.keys = [process.env.PASSPORT_SECRET];
app.use(session({ store: new RedisStore() }, app));

// all common middleware
const middleware = require('./middleware');
app.use(middleware());

const config = require('./config/config');

require('./public');
require('./private');

// start server
app.listen(config.port);
console.log(`listening on port ${config.port}`);
