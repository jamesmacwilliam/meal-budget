import Router from 'koa-router'
import User from '../../models/user'
import { authResponse } from '../../middleware/auth'
const passport = require('koa-passport')

const router = new Router()

router.post('/auth/login', passport.authenticate('local'), authResponse)
router.get('/auth/logout', logout)
router.post('/auth/signup', signup, authResponse)

async function logout(ctx) {
  if (ctx.isAuthenticated()) { ctx.logout() }
  ctx.status = 200
}

async function signup(ctx, next) {
  const { username, password } = ctx.request.body

  if (!(username && password)) {
    ctx.status = 400
    ctx.body = { status: 'invalid username/password' }
    return
  }

  if(await User.query().findOne({ username: username })) {
    ctx.status = 400
    ctx.body = { status: 'that username is already in use' }
    return
  }

  let user = await User.add({ username: username, password: password })
  ctx.status = 200
  ctx.login(user)
  await next()
}

module.exports = router
