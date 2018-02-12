const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const knex = require('../db/connection');

import User from '../models/user'

const options = {};

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

passport.serializeUser((user, done) => { done(null, user.id); })

passport.deserializeUser(async (id, done) => {
  let user = null
  try {
    let user = await User.query().findById(id)
    return done(null, user)
  } catch(err) {
    return done(null, err)
  }
})

passport.use(new LocalStrategy(options, async (username, password, done) => {
  let user = await User.query().findOne({ username: username })
  if (!user) return done(null, false)
  if (!comparePass(password, user.password)) return done(null, false)
  return done(null, user)
}))
