
exports.up = function(knex, Promise) {
  return knex.schema.createTable('meals_user_ingredients', (table) => {
    table.increments();
    table.integer('meal_id').notNullable();
    table.integer('user_ingredients_id').notNullable();
    table.integer('quantity_required');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('meals_user_ingredients');
};
