import Router from 'koa-router'
const passport = require('koa-passport')

const router = new Router()

router.post('/auth/login', async (ctx) => {
  return passport.authenticate('local', (err, user, info, status) => {
    ctx.type = 'json'

    if(user) {
      ctx.login(user)
      ctx.status = 200
      ctx.body = { status: 'success' }
    }else{
      ctx.status = 400
      ctx.body = { status: err }
    }
  })(ctx)
})

module.exports = router
