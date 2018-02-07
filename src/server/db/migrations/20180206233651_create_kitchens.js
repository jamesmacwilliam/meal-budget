
exports.up = function(knex, Promise) {
  return knex.schema.createTable('kitchens', (table) => {
    table.increments();
    table.integer('user_id').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('kitchens');
};
