
exports.up = (knex, Promise) => {
  return knex.schema.createTable('ingredients', (table) => {
    table.increments();
    table.string('name').unique().notNullable();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('ingredients');
};
