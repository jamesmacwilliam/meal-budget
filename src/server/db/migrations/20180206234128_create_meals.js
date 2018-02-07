
exports.up = function(knex, Promise) {
  return knex.schema.createTable('meals', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.integer('user_id').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('meals');
};
