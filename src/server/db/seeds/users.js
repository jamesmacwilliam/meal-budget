import User from '../../models/user'

exports.seed = (knex, Promise) => {
  return knex('users').del()
    .then(() => {
      return Promise.join(User.add({ username: 'admin@admin.com', password: 'password' }))
    })
}
