import compose from 'koa-compose'

import responseTime from 'koa-response-time'
import logger from './logger'
import conditional from 'koa-conditional-get'
import etag from 'koa-etag'
import kstatic from 'koa-static'
import compress from 'koa-compress'
import removeTrailingSlash from './removeTrailingSlash'
import passport from 'koa-passport'

// load environment variables
require('dotenv').load();

require('./auth')

// required for auth
import bodyParser from 'koa-bodyparser'

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
    bodyParser(),
    passport.initialize(),
    passport.session()
  ]);
};
