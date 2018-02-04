const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const passport = require('koa-passport');

const app = new Koa();

require('./middleware/auth');
app.use(passport.initialize());
app.use(passport.session());

const BaseDir = './routes/private';
fs.readdirSync(path.join(__dirname, BaseDir)).forEach((file) => {
  app.use(require(`${BaseDir}/${file}`).routes());
});
