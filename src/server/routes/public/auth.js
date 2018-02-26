import Router from 'koa-router'
import { generateToken } from '../../middleware/auth'
const passport = require('koa-passport')

const router = new Router()

router.post('/auth/login', passport.authenticate('local'), generateToken())

module.exports = router
