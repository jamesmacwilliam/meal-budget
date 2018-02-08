const conn = require('../connection').conn

export function find(user) {
  return conn('kitchens').
    where({ user_id: parseInt(user.id) }).
    select('*')
}

export function create(user) {
  return conn('kitchens').
    insert({ user_id: parseInt(user.id) }).
    returning('*')
}


export const base = conn('kitchens')
export const connection = conn
