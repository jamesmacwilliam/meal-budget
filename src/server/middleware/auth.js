import passport from 'koa-passport'

import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'

import bcrypt from 'bcryptjs'

import User from '../models/user'
import jwt from 'jsonwebtoken'


function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

passport.serializeUser((user, done) => { done(null, user.id); })

passport.deserializeUser(async (id, done) => {
  try {
    let user = await User.query().findById(id)
    return done(null, user)
  } catch(err) {
    return done(null, err)
  }
})

passport.use(new LocalStrategy({}, async (username, password, done) => {
  let user = await User.query().findOne({ username: username })
  if (!user) return done(null, false)
  if (!comparePass(password, user.password)) return done(null, false)
  return done(null, user)
}))

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey:    process.env.JWT_SECRET
}

passport.use('jwt', new JWTStrategy(opts, async (jwt_payload, done) => {
  const user = await User.query().findById(jwt_payload.id)
  if (!user) { return done(null, false) }
  return done(null, user)
}))

export function generateToken() {
  return async ctx => {
    const { user } = ctx.state
    if (user === false) {
      ctx.status = 401
    } else {
      const token = jwt.sign({id: user.id}, opts.secretOrKey, { expiresIn: '30m' })

      ctx.status = 200
      ctx.body = { token, user }
    }
  }
}
