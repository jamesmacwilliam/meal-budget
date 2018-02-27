import Koa from 'koa'
const app = new Koa();
import mount from 'koa-mount'

// load environment variables
require('dotenv').load();

// session
import session from 'koa-session'
import RedisStore from 'koa-redis'
app.keys = [process.env.PASSPORT_SECRET];
app.use(session({ store: new RedisStore() }, app));

// all common middleware
import middleware from './middleware'
app.use(middleware());

import config from './config/config'

// ORM
import { Model } from 'objection'
import { conn } from './db/connection'
Model.knex(conn)

app.use(mount('/', require('./public')))
app.use(mount('/api', require('./private')))

// start server
const server = app.listen(config.port)

// webpack dev server
if (config.assets) { require('./middleware/assets') }

console.log(`listening on port ${config.port}`);

export default server
