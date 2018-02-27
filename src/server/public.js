import Koa from 'koa'
import fs from 'fs'
import path from 'path'

const app = new Koa()

const BaseDir = './routes/public'
fs.readdirSync(path.join(__dirname, BaseDir)).forEach((file) => {
  app.use(require(`${BaseDir}/${file}`).routes())
});

module.exports = app
