import Router from 'koa-router'
import User from '../../models/user'
import { generateToken } from '../../middleware/auth'
const passport = require('koa-passport')

const router = new Router()

router.post('/auth/login', passport.authenticate('local'), generateToken())
router.post('/auth/signup', signup, generateToken())
router.post('/auth/refresh', passport.authenticate('jwt'), generateToken())

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
  ctx.state = { user: user }
  await next()
}

module.exports = router
