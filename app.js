const Koa = require('koa');
const app = new Koa();

const port = 3000;

// all middleware
const middleware = require('./app/middleware');
app.use(middleware());

// load environment variables
require('dotenv').load();

app.listen(port);
console.log(`listening on port ${port}`);
