import Router from 'koa-router'

const fs = require('fs')
const router = new Router()
const pug = require('pug')
const config = require('../../config/config');

let prefix = ""
if (config.assets) { prefix = `http://${config.assets.host}:${config.assets.port}` }

router.get('/', async (ctx) => {
  ctx.type = 'html'
  let username = null
  if(ctx.state.user) { username = ctx.state.user.username }
  ctx.body = pug.renderFile('./src/server/index.pug', {
    scriptBase: `${prefix}/dist/build.js`,
    loggedIn: ctx.isAuthenticated().toString(),
    username: username
  })
})


module.exports = router
