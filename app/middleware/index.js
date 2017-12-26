const compose = require('koa-compose');

const responseTime = require('koa-response-time');
const logger = require('./logger');
const conditional = require('koa-conditional-get');
const etag = require('koa-etag');
const static = require('koa-static');
const session = require('koa-session2');
const compress = require('koa-compress');
const remmoveTrailingSlash = require('./removeTrailingSlash');
const routes = require('./routes');

module.exports = () => {
  return compose([
    responseTime(),
    logger(),
    conditional(),
    etag(),
    static('./public'),
    session({key: 'mealBudget:sess'}),
    compress({
      filter: function (content_type) {
        return /text/i.test(content_type)
      },
      threshold: 2048,
      flush: require('zlib').Z_SYNC_FLUSH
    }),
    removeTrailingSlash(),
    routes()
  ]);
};
