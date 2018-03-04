import passport from 'koa-passport'

import { Strategy as LocalStrategy } from 'passport-local'

import bcrypt from 'bcryptjs'

import User from '../models/user'


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

passport.use(new LocalStrategy(async (username, password, done) => {
  let user = await User.query().findOne({ username: username })
  if (!user) return done(null, false)
  if (!comparePass(password, user.password)) return done(null, false)
  return done(null, user)
}))

export function authResponse(ctx) {
  const { user } = ctx.state
  if (user === false) {
    ctx.status = 402
  }else{
    ctx.status = 200
  }
}
