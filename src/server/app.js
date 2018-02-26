const Koa = require('koa');
const app = new Koa();
const mount = require('koa-mount');

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

// auth middleware
const passport = require('koa-passport');
require('./middleware/auth');
app.use(passport.initialize());
app.use(passport.session());

const config = require('./config/config');

// ORM
import { Model } from 'objection'
Model.knex(require('./db/connection').conn)

app.use(mount('/', require('./public')))
app.use(mount('/api', require('./private')))

// start server
const server = app.listen(config.port)

if (config.assets) {
  // assets
  const webpackConfig = require('../../webpack.config')
  const webpack = require('webpack')
  const WebpackDevServer = require('webpack-dev-server')
  new WebpackDevServer(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    historyApiFallback: true
  }).listen(config.assets.port, config.assets.host, (err, result) => {
    if (err) { console.log(err) }
  })
}

console.log(`listening on port ${config.port}`);

export default server
