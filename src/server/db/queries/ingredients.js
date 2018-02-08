const conn = require('../connection').conn

export function findAllByName(name) {
  return conn('ingredients').
    where('name', 'like', `%${name}%`).
    select('*')
}

export function find(id) {
  return conn('ingredients').
    where({ id: parseInt(id) })
    select('*')
}

export function createByName(name) {
  return conn('ingredients').
    insert({ name: name }).
    returning('*')
}


export const base = conn('ingredients')
export const connection = conn
