
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_ingredients', (table) => {
    table.increments();
    table.integer('user_id').notNullable();
    table.integer('kitchen_id').notNullable();
    table.integer('ingredient_id').notNullable();
    table.integer('meal_id')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_ingredients');
};
