const Koa = require('koa');
const fs = require('fs');
const path = require('path');

const app = new Koa();

const BaseDir = './routes/public';
fs.readdirSync(path.join(__dirname, BaseDir)).forEach((file) => {
  app.use(require(`${BaseDir}/${file}`).routes());
});

