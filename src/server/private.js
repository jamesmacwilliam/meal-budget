const Koa = require('koa');
const fs = require('fs');
const path = require('path');

const app = new Koa();

// require login
app.use((ctx, next) => {
  if (ctx.isAuthenticated()) { return next(); }
  ctx.type = 'json'
  ctx.status = 401
  ctx.body = { status: 'error', message: 'you do not have permission for that action' }
})

const BaseDir = './routes/private';
fs.readdirSync(path.join(__dirname, BaseDir)).forEach((file) => {
  app.use(require(`${BaseDir}/${file}`).routes());
});

module.exports = app
