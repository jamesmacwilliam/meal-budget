const Router = require('koa-router');

module.exports = () => {
  const router = new Router();
  require('../../../config/routes')(router);
  return router.routes();
};
