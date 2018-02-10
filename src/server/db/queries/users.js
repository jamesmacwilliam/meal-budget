const bcrypt = require('bcryptjs');
const conn = require('../connection').conn
const base = conn('users')

export const connection = conn

export function addUser(user) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(user.password, salt);
  return base
  .insert({ username: user.username, password: hash })
  .returning('*');
}

export function findIngredient(user, ingredient)
{
  return conn('user_ingredients').
    where({ ingredient_id: ingredient.id }).
    select('*')
}

export function createIngredient(user, ingredient)
{
  return conn('user_ingredients').
    insert({ ingredient_id: ingredient.id, user_id: user.id }).
    returning('*')
}

export function ingredients(user)
{
  return conn('user_ingredients').
    where({ user_id: user.id }).
    innerJoin('ingredients', 'user_ingredients.ingredient_id', 'ingredients.id').
    select('user_ingredients.*, ingredients.name')
}
