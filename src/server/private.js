import Koa from 'koa'
import fs from 'fs'
import path from 'path'

const app = new Koa();

import passport from 'koa-passport'
app.use((ctx, next) => {
  if (ctx.isAuthenticated()) { return next() }
  ctx.status = 401
  ctx.body = { login: 'required' }
})

const BaseDir = './routes/private'
fs.readdirSync(path.join(__dirname, BaseDir)).forEach((file) => {
  app.use(require(`${BaseDir}/${file}`).routes())
});

module.exports = app
