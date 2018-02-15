const compose = require('koa-compose');

const responseTime = require('koa-response-time');
const logger = require('./logger');
const conditional = require('koa-conditional-get');
const etag = require('koa-etag');
const kstatic = require('koa-static');
const compress = require('koa-compress');
const removeTrailingSlash = require('./removeTrailingSlash');

// required for auth
const bodyParser = require('koa-bodyparser');

module.exports = () => {
  return compose([
    responseTime(),
    logger(),
    conditional(),
    etag(),
    kstatic('./dist'),
    compress({
      filter: function (content_type) {
        return /text/i.test(content_type)
      },
      threshold: 2048,
      flush: require('zlib').Z_SYNC_FLUSH
    }),
    removeTrailingSlash(),
    bodyParser()
  ]);
};
