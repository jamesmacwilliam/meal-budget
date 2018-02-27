import { Model } from 'objection'
const bcrypt = require('bcryptjs');

class User extends Model {
  static tableName = 'users'
}

User.add = (attrs) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(attrs.password, salt);
  return User.query().insert({ username: attrs.username, password: hash })
}

export default User
