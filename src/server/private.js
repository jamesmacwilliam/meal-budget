const Koa = require('koa');
const fs = require('fs');
const path = require('path');

const app = new Koa();

import passport from 'koa-passport'
app.use(passport.authenticate('jwt'))

const BaseDir = './routes/private';
fs.readdirSync(path.join(__dirname, BaseDir)).forEach((file) => {
  app.use(require(`${BaseDir}/${file}`).routes());
});

module.exports = app
