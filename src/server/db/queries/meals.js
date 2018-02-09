const conn = require('../connection').conn

export function find(id) {
  return conn('meals').
    where({ id: parseInt(id) }).
    select('*')
}

export function fuzzyFind(user, name) {
  return conn('meals').
    where('name', 'like', `%${name}%`).
    where({ user_id: parseInt(user.id) }).
    select('*')
}

export function create(user, name) {
  return conn('meals').
    insert({ user_id: parseInt(user.id), name: name }).
    returning('*')
}


export const base = conn('meals')
export const connection = conn
